import { getCarouselDb } from "../_carousel.js";
import { parseCookies } from "../_db.js";
import { verifySession } from "../_auth.js";

export default async function handler(req: any, res: any) {
  const cookies = parseCookies(req.headers.cookie);
  if (!verifySession(cookies["admin_session"])) {
    return res.status(401).json({ error: "Nao autorizado" });
  }
  try {
    const sql = await getCarouselDb();
    if (req.method === "GET") {
      const rows = await sql`SELECT id, image_url, title, subtitle, cta FROM carousel_slides ORDER BY id ASC`;
      return res.status(200).json({ slides: rows });
    }
    if (req.method === "POST") {
      const body = req.body || {};
      const image_url = body.image_url;
      const title = body.title || "";
      const subtitle = body.subtitle || "";
      const cta = body.cta || "";
      if (!image_url) {
        return res.status(400).json({ error: "Imagem e obrigatoria" });
      }
      const rows = await sql`INSERT INTO carousel_slides (image_url, title, subtitle, cta) VALUES (${image_url}, ${title}, ${subtitle}, ${cta}) RETURNING id`;
      return res.status(200).json({ ok: true, id: rows[0].id });
    }
    if (req.method === "DELETE") {
      const body = req.body || {};
      const id = body.id;
      if (!id) {
        return res.status(400).json({ error: "id e obrigatorio" });
      }
      await sql`DELETE FROM carousel_slides WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao processar slide do carrossel" });
  }
}
