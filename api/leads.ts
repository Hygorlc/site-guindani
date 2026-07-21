import crypto from "node:crypto";
import { getDb } from "./_db.js";
export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
try {
const body = req.body || {};
const name = body.name;
const email = body.email;
const phone = body.phone;
const cnpj = body.cnpj;
if (!name || !email) {
return res.status(400).json({ error: "Nome e email sao obrigatorios" });
}
const sql = await getDb();
const token = crypto.randomUUID();
const rows = await sql`INSERT INTO leads (name, email, phone, cnpj, status, token) VALUES (${name}, ${email}, ${phone || null}, ${cnpj || null}, 'pending', ${token}) RETURNING id, status`;
res.setHeader("Set-Cookie", "lead_token=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=15552000");
return res.status(200).json({ status: rows[0] ? rows[0].status : "pending" });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao registrar cadastro" });
}
}