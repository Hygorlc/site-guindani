import crypto from "node:crypto";

export function hashPassword(password: string): string {
const salt = crypto.randomBytes(16).toString("hex");
const derived = crypto.scryptSync(password, salt, 64).toString("hex");
return salt + ":" + derived;
}

export function verifyPassword(password: string, stored: string | null | undefined): boolean {
if (!stored) return false;
const parts = stored.split(":");
if (parts.length !== 2) return false;
const salt = parts[0];
const hash = parts[1];
const expected = Buffer.from(hash, "hex");
const derived = crypto.scryptSync(password, salt, 64);
if (derived.length !== expected.length) return false;
return crypto.timingSafeEqual(derived, expected);
}
