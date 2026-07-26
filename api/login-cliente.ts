import { getDb } from "./_db.js";
import { verifyPassword } from "./_password.js";

export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
try {
const body = req.body || {};
const username = typeof body.username === "string" ? body.username.trim() : "";
const password = typeof body.password === "string" ? body.password : "";
if (!username || !password) {
return res.status(400).json({ error: "Usuario e senha sao obrigatorios" });
}
const sql = await getDb();
const rows = await sql`SELECT token, password_hash, status FROM leads WHERE username = ${username} LIMIT 1`;
if (!rows.length || !verifyPassword(password, rows[0].password_hash)) {
return res.status(401).json({ error: "Usuario ou senha incorretos" });
}
res.setHeader("Set-Cookie", "lead_token=" + rows[0].token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=15552000");
return res.status(200).json({ status: rows[0].status });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao efetuar login" });
}
}