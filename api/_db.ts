import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL as string);
let ensured = false;
export async function getDb() {
if (!ensured) {
await sql`CREATE TABLE IF NOT EXISTS leads (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, cnpj TEXT, status TEXT NOT NULL DEFAULT 'pending', token TEXT UNIQUE NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS username TEXT`;
await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS password_hash TEXT`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS leads_username_key ON leads (username) WHERE username IS NOT NULL`;
ensured = true;
}
return sql;
}
export function parseCookies(header: string | undefined) {
const cookies: Record<string, string> = {};
if (!header) return cookies;
header.split(";").forEach(function (part) {
const idx = part.indexOf("=");
if (idx === -1) return;
const key = part.slice(0, idx).trim();
const value = part.slice(idx + 1).trim();
cookies[key] = decodeURIComponent(value);
});
return cookies;
}