import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

let ensured = false;

export async function getCarouselDb() {
  if (!ensured) {
    await sql`CREATE TABLE IF NOT EXISTS carousel_slides (id SERIAL PRIMARY KEY, image_url TEXT NOT NULL, title TEXT NOT NULL DEFAULT '', subtitle TEXT NOT NULL DEFAULT '', cta TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
    await sql`ALTER TABLE carousel_slides ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0`;
    // Retira o convite encerrado que tambem existia na lista padrao antiga.
    await sql`DELETE FROM carousel_slides WHERE image_url = '/images/convite-feninjer-2026.jpg'`;
    ensured = true;
  }
  return sql;
}
