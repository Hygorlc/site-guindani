import { getCarouselDb } from "./_carousel.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const sql = await getCarouselDb();
    const rows = await sql`SELECT id, image_url, title, subtitle, cta FROM carousel_slides ORDER BY id ASC`;
    return res.status(200).json({ slides: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar carrossel" });
  }
}
