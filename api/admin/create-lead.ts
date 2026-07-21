import crypto from "node:crypto";
import { getDb, parseCookies } from "../_db.js";
import { verifySession } from "../_auth.js";

export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
const cookies = parseCookies(req.headers.cookie);
if (!verifySession(cookies["admin_session"])) {
return res.status(401).json({ error: "Nao autorizado" });
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
const rows = await sql`INSERT INTO leads (name, email, phone, cnpj, status, token) VALUES (${name}, ${email}, ${phone || null}, ${cnpj || null}, 'approved', ${token}) RETURNING id, name, email, phone, cnpj, status, created_at`;
return res.status(200).json({ lead: rows[0] });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao criar cadastro" });
}
}