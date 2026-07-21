export default async function handler(req: any, res: any) {
    res.setHeader("Set-Cookie", "admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
    return res.status(200).json({ ok: true });
    }