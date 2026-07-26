export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
res.setHeader("Set-Cookie", "lead_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
return res.status(200).json({ ok: true });
}