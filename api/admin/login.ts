import { signSession } from "../_auth";
export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
const body = req.body || {};
const password = body.password;
if (!password || password !== process.env.ADMIN_PASSWORD) {
return res.status(401).json({ error: "Senha incorreta" });
}
const session = signSession("admin");
res.setHeader("Set-Cookie", "admin_session=" + session + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800");
return res.status(200).json({ ok: true });
}