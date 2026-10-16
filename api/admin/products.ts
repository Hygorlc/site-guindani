import { getProductsDb } from "../_products.js";
import { getCarouselDb } from "../_carousel.js";
import { parseCookies } from "../_db.js";
import { verifySession } from "../_auth.js";

export default async function handler(req: any, res: any) {
  const cookies = parseCookies(req.headers.cookie);
  if (!verifySession(cookies["admin_session"])) {
    return res.status(401).json({ error: "Nao autorizado" });
  }
  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body); }
    catch { return res.status(400).json({ error: "Dados invalidos" }); }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Dados invalidos" });
  }
  const isCarousel = req.query.resource === "carousel" || body.resource === "carousel";
  try {
    if (isCarousel) {
      res.setHeader("Cache-Control", "no-store");
      const sql = await getCarouselDb();
      if (req.method === "GET") {
        const rows = await sql`SELECT id, image_url, title, subtitle, cta FROM carousel_slides ORDER BY sort_order ASC, id ASC`;
        return res.status(200).json({ slides: rows });
      }
      if (req.method === "PATCH") {
        if (body.id !== undefined) {
          const id = body.id;
          const imageUrl = body.image_url;
          if (!Number.isSafeInteger(id) || id <= 0 || id > 2147483647 ||
              typeof imageUrl !== "string" || !imageUrl.trim()) {
            return res.status(400).json({ error: "Imagem e id validos sao obrigatorios" });
          }
          const rows = await sql`UPDATE carousel_slides SET image_url = ${imageUrl} WHERE id = ${id} RETURNING id, image_url, title, subtitle, cta`;
          if (!rows.length) return res.status(404).json({ error: "Imagem nao encontrada" });
          return res.status(200).json({ ok: true, slide: rows[0] });
        }
        const ids = body.ids;
        if (!Array.isArray(ids) || ids.length === 0 ||
            !ids.every((id: unknown) => Number.isSafeInteger(id) && Number(id) > 0 && Number(id) <= 2147483647) ||
            new Set(ids).size !== ids.length) {
          return res.status(400).json({ error: "Ordem invalida" });
        }
        // Uma unica instrucao valida a lista inteira e salva sem ordens parciais.
        const rows = await sql`
          WITH desired AS (
            SELECT value::integer AS id, ordinality::integer AS position
            FROM jsonb_array_elements_text(${JSON.stringify(ids)}::jsonb) WITH ORDINALITY
          ), valid AS (
            SELECT 1 WHERE (SELECT COUNT(*) FROM carousel_slides) = ${ids.length}
              AND (SELECT COUNT(*) FROM carousel_slides JOIN desired USING (id)) = ${ids.length}
          )
          UPDATE carousel_slides AS slides SET sort_order = desired.position
          FROM desired, valid WHERE slides.id = desired.id RETURNING slides.id`;
        if (rows.length !== ids.length) {
          return res.status(409).json({ error: "A lista mudou. Atualize o carrossel e tente novamente." });
        }
        return res.status(200).json({ ok: true });
      }
      if (req.method === "POST") {
        const image_url = body.image_url;
        const title = body.title || "";
        const subtitle = body.subtitle || "";
        const cta = body.cta || "";
        if (!image_url) {
          return res.status(400).json({ error: "Imagem e obrigatoria" });
        }
        const rows = await sql`INSERT INTO carousel_slides (image_url, title, subtitle, cta, sort_order) VALUES (${image_url}, ${title}, ${subtitle}, ${cta}, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM carousel_slides)) RETURNING id`;
        return res.status(200).json({ ok: true, id: rows[0].id });
      }
      if (req.method === "DELETE") {
        const id = Number(body.id ?? req.query.id);
        if (!Number.isSafeInteger(id) || id <= 0 || id > 2147483647) {
          return res.status(400).json({ error: "id valido e obrigatorio" });
        }
        const rows = await sql`DELETE FROM carousel_slides WHERE id = ${id} RETURNING id`;
        if (!rows.length) return res.status(404).json({ error: "Imagem nao encontrada" });
        return res.status(200).json({ ok: true, id: rows[0].id });
      }
      res.setHeader("Allow", "GET, POST, PATCH, DELETE");
      return res.status(405).json({ error: "Method not allowed" });
    }
    const sql = await getProductsDb();
    if (req.method === "GET") {
      const rows = await sql`SELECT id, category, image_url, description FROM products ORDER BY created_at DESC`;
      return res.status(200).json({ products: rows });
    }
    if (req.method === "POST") {
      const category = body.category;
      const image_url = body.image_url;
      const description = body.description;
      if (!category || !image_url || !description) {
        return res.status(400).json({ error: "Dados incompletos" });
      }
      const rows = await sql`INSERT INTO products (category, image_url, description) VALUES (${category}, ${image_url}, ${description}) RETURNING id`;
      return res.status(200).json({ ok: true, id: rows[0].id });
    }
    if (req.method === "DELETE") {
      const id = body.id;
      if (!id) {
        return res.status(400).json({ error: "id e obrigatorio" });
      }
      await sql`DELETE FROM products WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao processar produto" });
  }
}
