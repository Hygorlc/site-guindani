import { getDb, parseCookies } from "../_db.js";
import { verifySession } from "../_auth.js";
import { hashPassword } from "../_password.js";
export default async function handler(req: any, res: any) {
const cookies = parseCookies(req.headers.cookie);
if (!verifySession(cookies["admin_session"])) {
return res.status(401).json({ error: "Nao autorizado" });
}
if (req.method === "GET") {
try {
const sql = await getDb();
const rows = await sql`SELECT id, name, email, phone, cnpj, details, status, created_at FROM leads ORDER BY created_at DESC`;
return res.status(200).json({ leads: rows });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao listar cadastros" });
}
}
if (req.method === "POST") {
const body = req.body || {};
const id = body.id;
const newPassword = body.newPassword;
if (!id || !newPassword) {
return res.status(400).json({ error: "id e newPassword sao obrigatorios" });
}
if (String(newPassword).length < 6) {
return res.status(400).json({ error: "Senha deve ter ao menos 6 caracteres" });
}
try {
const sql = await getDb();
const hash = hashPassword(String(newPassword));
await sql`UPDATE leads SET password_hash = ${hash} WHERE id = ${id}`;
return res.status(200).json({ ok: true });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao redefinir senha" });
}
}
if (req.method === "DELETE") {
const body = req.body || {};
const id = body.id;
if (!id) {
return res.status(400).json({ error: "id e obrigatorio" });
}
try {
const sql = await getDb();
await sql`DELETE FROM leads WHERE id = ${id}`;
return res.status(200).json({ ok: true });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao excluir cadastro" });
}
}
res.setHeader("Allow", "GET, POST, DELETE");
return res.status(405).json({ error: "Method not allowed" });
}
