import OpenAI from "openai";

function getApiKey(): string | undefined {
  return process.env.OPENAI_API_KEY;
}

export function isOpenAIConfigured(): boolean {
  return Boolean(getApiKey());
}

export function createOpenAIClient(): OpenAI | null {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
  });
}

function requestOptions() {
  const controller = new AbortController();
  const timeoutMs = Number(process.env.OPENAI_TIMEOUT_MS ?? 45_000);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  };
}

export async function runJsonCompletion(
  system: string,
  user: string,
): Promise<unknown> {
  const client = createOpenAIClient();
  if (!client) {
    throw new Error("OpenAI is not configured. Set OPENAI_API_KEY.");
  }
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const options = requestOptions();
  const completion = await client.chat.completions
    .create(
      {
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: Number(process.env.OPENAI_JSON_MAX_TOKENS ?? 1400),
        temperature: 0.7,
      },
      { signal: options.signal },
    )
    .finally(options.clear);
  const content = completion.choices[0]?.message?.content ?? "{}";
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      `OpenAI returned invalid JSON: ${error instanceof Error ? error.message : "parse failed"}`,
    );
  }
}

export async function runTextCompletion(
  system: string,
  user: string,
): Promise<string> {
  const client = createOpenAIClient();
  if (!client) {
    throw new Error("OpenAI is not configured. Set OPENAI_API_KEY.");
  }
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const options = requestOptions();
  const completion = await client.chat.completions
    .create(
      {
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        max_completion_tokens: Number(process.env.OPENAI_TEXT_MAX_TOKENS ?? 2200),
        temperature: 0.5,
      },
      { signal: options.signal },
    )
    .finally(options.clear);
  return completion.choices[0]?.message?.content?.trim() ?? "";
}
