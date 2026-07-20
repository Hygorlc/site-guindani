import crypto from "node:crypto";
const SECRET = process.env.ADMIN_SESSION_SECRET || "";
export function signSession(value: string): string {
const hmac = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
return value + "." + hmac;
}
export function verifySession(token: string | undefined): boolean {
if (!token) return false;
const idx = token.lastIndexOf(".");
if (idx === -1) return false;
const value = token.slice(0, idx);
const sig = token.slice(idx + 1);
const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
if (sig.length !== expected.length) return false;
try {
return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
} catch (e) {
return false;
}
}