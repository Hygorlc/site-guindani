import { getDb, parseCookies } from "./_db.js";
export default async function handler(req: any, res: any) {
if (req.method !== "GET") {
res.setHeader("Allow", "GET");
return res.status(405).json({ error: "Method not allowed" });
}
try {
const cookies = parseCookies(req.headers.cookie);
const token = cookies["lead_token"];
if (!token) {
return res.status(200).json({ status: "none" });
}
const sql = await getDb();
const rows = await sql`SELECT status FROM leads WHERE token = ${token} LIMIT 1`;
if (!rows.length) {
return res.status(200).json({ status: "none" });
}
return res.status(200).json({ status: rows[0].status });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao verificar status" });
}
}