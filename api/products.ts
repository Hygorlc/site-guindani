import { getProductsDb } from "./_products.js";
import { getCarouselDb } from "./_carousel.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    if (req.query.resource === "carousel") {
      const sql = await getCarouselDb();
      const rows = await sql`SELECT id, image_url, title, subtitle, cta FROM carousel_slides ORDER BY id ASC`;
      return res.status(200).json({ slides: rows });
    }
    const sql = await getProductsDb();
    const category = req.query.category as string | undefined;
    const rows = category
      ? await sql`SELECT id, category, image_url, description FROM products WHERE category = ${category} ORDER BY created_at DESC`
      : await sql`SELECT id, category, image_url, description FROM products ORDER BY created_at DESC`;
    return res.status(200).json({ products: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar produtos" });
  }
}
