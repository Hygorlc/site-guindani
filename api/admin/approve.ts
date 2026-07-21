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
const body = req.body || {};
const id = body.id;
const newStatus = body.status === "rejected" ? "rejected" : "approved";
if (!id) {
return res.status(400).json({ error: "id e obrigatorio" });
}
try {
const sql = await getDb();
await sql`UPDATE leads SET status = ${newStatus} WHERE id = ${id}`;
return res.status(200).json({ ok: true });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao atualizar cadastro" });
}
}