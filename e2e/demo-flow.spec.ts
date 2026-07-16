import { expect, test } from "@playwright/test";

const idea = "An AI sprint planner for university project teams";
const completedNote = "Today I completed the project creation flow.";
const blockerNote = "Blocked by missing live deployment credentials.";
const nextNote = "Next I will run the production smoke test.";

test("completes the Sprint 2 demo journey", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Turn messy ideas into build-ready MVPs",
    }),
  ).toBeVisible();

  await page
    .locator("main")
    .getByRole("link", { name: "Summon your pixies" })
    .click();
  await expect(page).toHaveURL(/\/projects\/new$/);

  await page.getByLabel("What do you want to build?").fill(idea);
  await page.getByLabel("Who is it for?").fill("university project teams");
  await page.getByLabel("Goal").selectOption("bootcamp");
  await page.getByLabel("Platform").selectOption("web");
  await page.getByRole("button", { name: "Summon your pixies" }).click();

  await expect(page).toHaveURL(/\/projects\/[0-9a-f-]+$/);
  await expect(page.getByRole("heading", { level: 2, name: idea })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pixie team" })).toBeVisible();

  await page.getByRole("button", { name: "Generate blueprint" }).click();
  await expect(page.getByRole("heading", { name: "Blueprint" })).toBeVisible({
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

  await page.getByRole("link", { name: "Back to dashboard" }).click();
  await expect(page.getByRole("heading", { name: "Your projects" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: idea })).toBeVisible();
  await expect(page.getByText("ready", { exact: true })).toBeVisible();
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
