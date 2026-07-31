import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

let ensured = false;

export async function getCarouselDb() {
  if (!ensured) {
    await sql`CREATE TABLE IF NOT EXISTS carousel_slides (id SERIAL PRIMARY KEY, image_url TEXT NOT NULL, title TEXT NOT NULL DEFAULT '', subtitle TEXT NOT NULL DEFAULT '', cta TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
    const countRows = await sql`SELECT COUNT(*)::int AS count FROM carousel_slides`;
    if (countRows[0].count === 0) {
      await sql`INSERT INTO carousel_slides (image_url, title, subtitle, cta) VALUES
        ('/images/convite-feninjer-2026.jpg', '83ª Feninjer+', '17 a 20 de agosto de 2026 — Transamérica Expo Center', 'Saiba mais'),
        ('/images/hero-2.jpg', 'Brilho Contemporâneo', 'Peças com cristais que impõem presença', 'Descobrir peças'),
        ('/images/hero-3.jpg', 'Design Autêntico', 'Brincos que traduzem sua personalidade', 'Ver brincos'),
        ('/images/hero-4.jpg', 'Ouro Puro, Estilo Único', 'Correntes e pulseiras para todos os momentos', 'Explorar coleção'),
        ('/images/hero-5.jpg', 'Amor em Forma de Joia', 'Peças que eternizam sentimentos', 'Ver coleção')`;
    }
    ensured = true;
  }
  return sql;
}
