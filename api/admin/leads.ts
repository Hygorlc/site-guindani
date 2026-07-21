import { getDb, parseCookies } from "../_db.js";
import { verifySession } from "../_auth.js";
export default async function handler(req: any, res: any) {
if (req.method !== "GET") {
res.setHeader("Allow", "GET");
return res.status(405).json({ error: "Method not allowed" });
}
const cookies = parseCookies(req.headers.cookie);
if (!verifySession(cookies["admin_session"])) {
return res.status(401).json({ error: "Nao autorizado" });
}
try {
const sql = await getDb();
const rows = await sql`SELECT id, name, email, phone, cnpj, status, created_at FROM leads ORDER BY created_at DESC`;
return res.status(200).json({ leads: rows });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao listar cadastros" });
}
}