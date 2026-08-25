import { signSession } from "../_auth.js";

export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
const body = req.body || {};
const username = body.username;
const password = body.password;
const expectedUsername = process.env.ADMIN_USERNAME || "admin";
const expectedPassword = process.env.ADMIN_PASSWORD;
if (!process.env.ADMIN_SESSION_SECRET || !expectedPassword) {
console.error("ADMIN_SESSION_SECRET ou ADMIN_PASSWORD nao configurados");
return res.status(500).json({ error: "Servidor mal configurado" });
}
if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
return res.status(401).json({ error: "Usuario ou senha incorretos" });
}
const session = signSession("admin");
// 7 dias. Antes eram 8h (28800), o que fazia o painel expirar durante o dia de trabalho.
res.setHeader("Set-Cookie", "admin_session=" + session + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800");
return res.status(200).json({ ok: true });
}