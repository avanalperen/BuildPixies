import "server-only";

import OpenAI from "openai";
import { ServiceUnavailableError } from "@/lib/errors";

export type AIProvider = "openrouter" | "openai";

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  baseURL?: string;
  model: string;
  defaultHeaders?: Record<string, string>;
  timeoutMs: number;
  jsonMaxTokens: number;
  textMaxTokens: number;
}

interface OpenRouterProviderPreferences {
  provider?: {
    require_parameters: true;
    data_collection: "allow" | "deny";
  };
}

type ChatCompletionRequest =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming &
  OpenRouterProviderPreferences;

function nonEmpty(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

function positiveInteger(
  value: string | undefined,
  fallback: number,
): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeSiteUrl(value: string | undefined): string | undefined {
  const siteUrl = nonEmpty(value);
  if (!siteUrl) return undefined;
  return /^https?:\/\//i.test(siteUrl) ? siteUrl : `https://${siteUrl}`;
}

function openRouterHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "X-OpenRouter-Title":
      nonEmpty(process.env.OPENROUTER_APP_NAME) ?? "BuildPixies",
  };
  const siteUrl = normalizeSiteUrl(
    process.env.OPENROUTER_SITE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
  );
  if (siteUrl) headers["HTTP-Referer"] = siteUrl;
  return headers;
}

function providerPreferences(config: AIConfig): OpenRouterProviderPreferences {
  if (config.provider !== "openrouter") return {};
  return {
    provider: {
      require_parameters: true,
      data_collection:
        process.env.OPENROUTER_ALLOW_DATA_COLLECTION === "1"
          ? "allow"
          : "deny",
    },
  };
}

export function getAIConfig(): AIConfig | null {
  const openRouterApiKey = nonEmpty(process.env.OPENROUTER_API_KEY);
  if (openRouterApiKey) {
    return {
      provider: "openrouter",
      apiKey: openRouterApiKey,
      baseURL:
        nonEmpty(process.env.OPENROUTER_BASE_URL) ??
        "https://openrouter.ai/api/v1",
      model: nonEmpty(process.env.OPENROUTER_MODEL) ?? "openrouter/free",
      defaultHeaders: openRouterHeaders(),
      timeoutMs: positiveInteger(process.env.OPENROUTER_TIMEOUT_MS, 90_000),
      jsonMaxTokens: positiveInteger(
        process.env.OPENROUTER_JSON_MAX_TOKENS,
        1_400,
      ),
      textMaxTokens: positiveInteger(
        process.env.OPENROUTER_TEXT_MAX_TOKENS,
        2_200,
      ),
    };
  }

  const openAIApiKey = nonEmpty(process.env.OPENAI_API_KEY);
  if (openAIApiKey) {
    return {
      provider: "openai",
      apiKey: openAIApiKey,
      baseURL: nonEmpty(process.env.OPENAI_BASE_URL),
      model: nonEmpty(process.env.OPENAI_MODEL) ?? "gpt-4o-mini",
      timeoutMs: positiveInteger(process.env.OPENAI_TIMEOUT_MS, 45_000),
      jsonMaxTokens: positiveInteger(
        process.env.OPENAI_JSON_MAX_TOKENS,
        1_400,
      ),
      textMaxTokens: positiveInteger(
        process.env.OPENAI_TEXT_MAX_TOKENS,
        2_200,
      ),
    };
  }

  return null;
}

export function isAIConfigured(): boolean {
  return getAIConfig() !== null;
}

export function createAIClient(config = getAIConfig()): OpenAI | null {
  if (!config) return null;
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    defaultHeaders: config.defaultHeaders,
  });
}

function requestOptions(timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  };
}

function configurationError(): ServiceUnavailableError {
  return new ServiceUnavailableError(
    "AI is not configured. Set OPENROUTER_API_KEY or OPENAI_API_KEY.",
  );
}

function requestError(
  config: AIConfig,
  error: unknown,
  timedOut: boolean,
): ServiceUnavailableError {
  console.error("AI provider request failed", {
    provider: config.provider,
    model: config.model,
    errorName: error instanceof Error ? error.name : "UnknownError",
    status:
      error instanceof OpenAI.APIError ? error.status : undefined,
  });
  return new ServiceUnavailableError(
    timedOut
      ? "AI provider request timed out"
      : "AI provider is temporarily unavailable",
  );
}

function parseJsonContent(content: string): unknown {
  const normalized = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  try {
    return JSON.parse(normalized || "{}");
  } catch {
    throw new ServiceUnavailableError(
      "AI provider returned invalid structured output",
    );
  }
}

export async function runJsonCompletion(
  system: string,
  user: string,
): Promise<unknown> {
  const config = getAIConfig();
  const client = createAIClient(config);
  if (!config || !client) throw configurationError();

  const options = requestOptions(config.timeoutMs);
  try {
    const tokenLimit = config.provider === "openrouter"
      ? { max_tokens: config.jsonMaxTokens }
      : { max_completion_tokens: config.jsonMaxTokens };
    const request: ChatCompletionRequest = {
      model: config.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      ...tokenLimit,
      ...providerPreferences(config),
    };
    const completion = await client.chat.completions.create(
      request,
      { signal: options.signal },
    );
    return parseJsonContent(completion.choices[0]?.message?.content ?? "{}");
  } catch (error) {
    if (error instanceof ServiceUnavailableError) throw error;
    throw requestError(config, error, options.signal.aborted);
  } finally {
    options.clear();
  }
}

export async function runTextCompletion(
  system: string,
  user: string,
): Promise<string> {
  const config = getAIConfig();
  const client = createAIClient(config);
  if (!config || !client) throw configurationError();

  const options = requestOptions(config.timeoutMs);
  try {
    const tokenLimit = config.provider === "openrouter"
      ? { max_tokens: config.textMaxTokens }
      : { max_completion_tokens: config.textMaxTokens };
    const request: ChatCompletionRequest = {
      model: config.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.5,
      ...tokenLimit,
      ...providerPreferences(config),
    };
    const completion = await client.chat.completions.create(
      request,
      { signal: options.signal },
    );
    return completion.choices[0]?.message?.content?.trim() ?? "";
  } catch (error) {
    throw requestError(config, error, options.signal.aborted);
  } finally {
    options.clear();
  }
}
