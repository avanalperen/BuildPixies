import { expect, test } from "@playwright/test";

const idea = "An AI sprint planner for university project teams";
const completedNote = "Today I completed the project creation flow.";
const blockerNote = "Blocked by missing live deployment credentials.";
const nextNote = "Next I will run the production smoke test.";

test("completes the core product journey", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Turn messy ideas into build-ready MVPs.",
    }),
  ).toBeVisible();

  await page
    .locator("main")
    .getByRole("link", { name: "Summon your pixies" })
    .click();
  await expect(page).toHaveURL(/\/projects\/new$/);

  await page.getByLabel("What are we building?").fill(idea);
  await page.getByRole("button", { name: "Goal", exact: true }).click();
  await page.getByLabel("Who is it for?").fill("university project teams");
  await page.getByRole("button", { name: "Platform", exact: true }).click();
  await page.getByRole("button", { name: "Web App", exact: true }).click();
  await page.getByRole("button", { name: "Constraints", exact: true }).click();
  await expect(page.getByRole("button", { name: "Summon the Team" })).toBeVisible();
  await page.locator("form").evaluate((form: HTMLFormElement) => form.requestSubmit());

  await expect(page).toHaveURL(/\/projects\/[0-9a-f-]+$/);
  await expect(page.getByRole("heading", { level: 1, name: idea })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The Pixie Team" })).toBeVisible();

  await page.getByRole("button", { name: "Generate blueprint" }).click();
  await expect(page.getByRole("heading", { name: "Blueprint Output" })).toBeVisible({
    timeout: 45_000,
  });

  await page.getByRole("tab", { name: "Backlog" }).first().click();
  await expect(page.getByText("Set up project", { exact: true })).toBeVisible();

  await page.getByRole("tab", { name: "README" }).first().click();
  await expect(page.getByRole("button", { name: "Copy Markdown" }).first()).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download README.md" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("README.md");

  await page.getByLabel("Sprint name").fill("Sprint 2");
  await page.getByLabel("Sprint goal").fill("Finish the working MVP");
  await page
    .getByLabel("Progress notes")
    .fill(`${completedNote}\n${blockerNote}\n${nextNote}`);
  await page.getByRole("button", { name: "Generate report" }).click();

  await expect(page.getByText(/^Saved \d{4}-\d{2}-\d{2}/)).toBeVisible();
  await page.getByRole("tab", { name: "Daily" }).click();
  await expect(page.getByText(completedNote).last()).toBeVisible();
  await expect(page.getByText(blockerNote).last()).toBeVisible();
  await expect(page.getByText(nextNote).last()).toBeVisible();

  await page.reload();
  await expect(page.getByLabel("Progress notes")).toHaveValue(
    `${completedNote}\n${blockerNote}\n${nextNote}`,
  );
  await expect(page.getByText(/^Saved \d{4}-\d{2}-\d{2}/)).toBeVisible();

  await page
    .getByRole("navigation", { name: "Breadcrumb" })
    .getByRole("link", { name: "Dashboard" })
    .click();
  await expect(page.getByRole("heading", { name: "My Projects" })).toBeVisible();
  const readyProject = page
    .getByRole("article")
    .filter({ has: page.getByText("Blueprint Ready", { exact: true }) });
  await expect(readyProject.getByRole("heading", { level: 2, name: idea })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: idea })).toHaveCount(1);
});

test("keeps the main journey responsive on mobile", async ({ page, request }) => {
  const createResponse = await request.post("/api/projects", {
    data: {
      rawIdea: "A responsive planning workspace for mobile product teams",
      goal: "bootcamp",
      platform: "web",
      targetAudience: "mobile product teams",
    },
  });
  expect(createResponse.status()).toBe(201);
  const created = (await createResponse.json()) as {
    project: { id: string };
  };

  await page.setViewportSize({ width: 390, height: 844 });

  for (const path of ["/", "/projects/new", "/dashboard"]) {
    await page.goto(path);
    await expect(page.locator("body")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow, `${path} should not overflow horizontally`).toBe(false);
  }

  await expect(page.getByRole("heading", { name: "My Projects" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

  await page.goto(`/projects/${created.project.id}`);
  await expect(page.getByRole("heading", { name: "The Pixie Team" })).toBeVisible();
  const workspaceHasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(workspaceHasHorizontalOverflow, "workspace should not overflow horizontally").toBe(false);
});

test("reports real pipeline progress and exports from the stored project", async ({
  request,
}) => {
  const createResponse = await request.post("/api/projects", {
    data: {
      rawIdea: "A shared reading list app for small book clubs",
      goal: "bootcamp",
      platform: "web",
      targetAudience: "book clubs",
    },
  });
  expect(createResponse.status()).toBe(201);
  const { project } = (await createResponse.json()) as {
    project: { id: string };
  };

  // Regenerating before a blueprint exists is a conflict, not a silent no-op.
  const earlyRegenerate = await request.post("/api/regenerate-output", {
    data: { projectId: project.id, section: "productBrief" },
  });
  expect(earlyRegenerate.status()).toBe(409);

  const jobResponse = await request.post("/api/generation-jobs", {
    data: { projectId: project.id },
  });
  expect(jobResponse.status()).toBe(202);
  const created = (await jobResponse.json()) as {
    job: {
      id: string;
      progress?: { steps: { section: string; status: string }[] };
    };
  };
  expect(created.job.progress?.steps.length).toBe(11);
  expect(
    created.job.progress?.steps.every((step) => step.status === "pending"),
  ).toBe(true);

  let job = created.job as {
    id: string;
    status?: string;
    progress?: { steps: { section: string; status: string }[] };
  };
  for (let attempt = 0; attempt < 30 && job.status !== "succeeded"; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const poll = await request.get(`/api/generation-jobs/${created.job.id}`);
    expect(poll.status()).toBe(200);
    job = ((await poll.json()) as { job: typeof job }).job;
  }
  expect(job.status).toBe("succeeded");
  expect(job.progress?.steps.every((step) => step.status === "done")).toBe(true);

  // The stored blueprint is enough to export; no client payload required.
  const readme = await request.post("/api/export-readme", {
    data: { projectId: project.id },
  });
  expect(readme.status()).toBe(200);
  await expect(readme.json()).resolves.toMatchObject({ filename: "README.md" });
});

test("rejects invalid project input", async ({ request }) => {
  const response = await request.post("/api/projects", {
    data: {
      rawIdea: "short",
      goal: "bootcamp",
      platform: "web",
      targetAudience: "builders",
    },
  });

  expect(response.status()).toBe(400);
  await expect(response.json()).resolves.toMatchObject({
    error: "Invalid request body",
    details: [{ path: "rawIdea" }],
  });
});

test("keeps the project wizard sequential and validates the idea", async ({ page }) => {
  await page.goto("/projects/new");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator("#project-form-error")).toContainText(
    "at least 20 characters",
  );
  await expect(page.getByLabel("What are we building?")).toBeFocused();

  await page.getByLabel("What are we building?").fill(idea);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(
    page.getByRole("button", { name: "Goal", exact: true }),
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("button", { name: "Summon the Team" })).toHaveCount(0);
});

test("enforces JSON requests and UUID resources", async ({ request }) => {
  const unsupported = await request.fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    data: JSON.stringify({ rawIdea: "A sufficiently detailed project idea" }),
  });
  expect(unsupported.status()).toBe(415);
  await expect(unsupported.json()).resolves.toMatchObject({
    error: "Content-Type must be application/json",
  });

  const invalidId = await request.get("/api/projects/not-a-uuid");
  expect(invalidId.status()).toBe(400);
  await expect(invalidId.json()).resolves.toMatchObject({
    error: "Invalid project id",
  });
});

test("renders an accessible not-found state", async ({ page }) => {
  await page.goto("/projects/00000000-0000-4000-8000-000000000000");
  await expect(
    page.getByRole("heading", { name: "This workspace was not found" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to projects" })).toBeVisible();
});
