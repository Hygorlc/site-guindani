import { expect, it, vi } from "vitest";

const { sql } = vi.hoisted(() => ({ sql: vi.fn().mockResolvedValue([]) }));
vi.mock("@neondatabase/serverless", () => ({ neon: () => sql }));

it("does not recreate deleted slides when the table is empty", async () => {
  const { getCarouselDb } = await import("../api/_carousel");
  await getCarouselDb();
  const statements = sql.mock.calls.map((call) => call[0].join(""));
  expect(statements.some((query) => /INSERT/i.test(query))).toBe(false);
  expect(statements.some((query) => query.includes("sort_order"))).toBe(true);
  expect(statements.some((query) => query.includes("DELETE") && query.includes("convite-feninjer-2026.jpg"))).toBe(true);
  const count = sql.mock.calls.length;
  await getCarouselDb();
  expect(sql.mock.calls.length).toBe(count);
});
