import { beforeEach, describe, expect, it, vi } from "vitest";

const { sql, verifySession } = vi.hoisted(() => ({
  sql: vi.fn(),
  verifySession: vi.fn(() => true),
}));
vi.mock("../api/_carousel.js", () => ({ getCarouselDb: async () => sql }));
vi.mock("../api/_products.js", () => ({ getProductsDb: async () => sql }));
vi.mock("../api/_db.js", () => ({ parseCookies: () => ({ admin_session: "session" }) }));
vi.mock("../api/_auth.js", () => ({ verifySession }));

import adminHandler from "../api/admin/products";
import publicHandler from "../api/products";

function response() {
  return {
    setHeader: vi.fn(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
}

beforeEach(() => {
  sql.mockReset().mockResolvedValue([]);
  verifySession.mockReturnValue(true);
});

describe("carousel API", () => {
  it("keeps an empty carousel empty and disables caching", async () => {
    const res = response();
    await publicHandler({ method: "GET", query: { resource: "carousel" } }, res);
    expect(res.json).toHaveBeenCalledWith({ slides: [] });
    expect(res.setHeader).toHaveBeenCalledWith("Cache-Control", "no-store");
    expect(sql.mock.calls[0][0].join("")).toContain("ORDER BY sort_order ASC, id ASC");
  });

  it("returns the configured order in admin as well", async () => {
    const res = response();
    sql.mockResolvedValue([{ id: 3 }, { id: 1 }]);
    await adminHandler({ method: "GET", headers: {}, query: { resource: "carousel" } }, res);
    expect(res.json).toHaveBeenCalledWith({ slides: [{ id: 3 }, { id: 1 }] });
    expect(sql.mock.calls[0][0].join("")).toContain("ORDER BY sort_order ASC, id ASC");
  });

  it.each([{ ids: [1, 1] }, { ids: [0, 1] }, { ids: [1, "2"] }, { ids: [] }, { ids: [1.5, 2] }])("rejects invalid order $ids", async ({ ids }) => {
    const res = response();
    await adminHandler({ method: "PATCH", headers: {}, query: {}, body: { resource: "carousel", ids } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(sql).not.toHaveBeenCalled();
  });

  it("saves the full order in a single statement", async () => {
    sql.mockResolvedValue([{ id: 3 }, { id: 1 }]);
    const res = response();
    await adminHandler({ method: "PATCH", headers: {}, query: {}, body: { resource: "carousel", ids: [3, 1] } }, res);
    expect(sql).toHaveBeenCalledTimes(1);
    expect(sql.mock.calls[0].slice(1)).toEqual(["[3,1]", 2, 2]);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("rejects stale lists when the slides have changed", async () => {
    const res = response();
    await adminHandler({ method: "PATCH", headers: {}, query: {}, body: { resource: "carousel", ids: [3, 1] } }, res);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("requires an admin session to reorder", async () => {
    verifySession.mockReturnValue(false);
    const res = response();
    await adminHandler({ method: "PATCH", headers: {}, query: {}, body: { resource: "carousel", ids: [3, 1] } }, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(sql).not.toHaveBeenCalled();
  });
});
