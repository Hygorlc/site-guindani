import crypto from "node:crypto";
import { getDb } from "./_db.js";
import { hashPassword } from "./_password.js";

export default async function handler(req: any, res: any) {
if (req.method !== "POST") {
res.setHeader("Allow", "POST");
return res.status(405).json({ error: "Method not allowed" });
}
try {
const body = req.body || {};
const name = body.name;
const email = body.email;
const phone = body.phone;
const cnpj = body.cnpj;
const details = JSON.stringify({
  ie: typeof body.ie === "string" ? body.ie : "",
  razaoSocial: typeof body.razaoSocial === "string" ? body.razaoSocial : "",
  ramoDesde: typeof body.ramoDesde === "string" ? body.ramoDesde : "",
  endereco: typeof body.endereco === "string" ? body.endereco : "",
  cidade: typeof body.cidade === "string" ? body.cidade : "",
  uf: typeof body.uf === "string" ? body.uf : "",
  cep: typeof body.cep === "string" ? body.cep : "",
  contato: typeof body.contato === "string" ? body.contato : "",
  ref1Empresa: typeof body.ref1Empresa === "string" ? body.ref1Empresa : "",
  ref1CidadeUf: typeof body.ref1CidadeUf === "string" ? body.ref1CidadeUf : "",
  ref1Telefone: typeof body.ref1Telefone === "string" ? body.ref1Telefone : "",
  ref2Empresa: typeof body.ref2Empresa === "string" ? body.ref2Empresa : "",
  ref2CidadeUf: typeof body.ref2CidadeUf === "string" ? body.ref2CidadeUf : "",
  ref2Telefone: typeof body.ref2Telefone === "string" ? body.ref2Telefone : "",
  ref3Empresa: typeof body.ref3Empresa === "string" ? body.ref3Empresa : "",
  ref3CidadeUf: typeof body.ref3CidadeUf === "string" ? body.ref3CidadeUf : "",
  ref3Telefone: typeof body.ref3Telefone === "string" ? body.ref3Telefone : "",
  dataFormulario: typeof body.dataFormulario === "string" ? body.dataFormulario : "",
});
const username = typeof body.username === "string" ? body.username.trim() : "";
const password = typeof body.password === "string" ? body.password : "";
if (!name || !email) {
return res.status(400).json({ error: "Nome e email sao obrigatorios" });
}
if (!username || !password) {
return res.status(400).json({ error: "Usuario e senha sao obrigatorios" });
}
if (password.length < 6) {
return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
}
const sql = await getDb();
const existing = await sql`SELECT id FROM leads WHERE username = ${username} LIMIT 1`;
if (existing.length) {
return res.status(409).json({ error: "Esse nome de usuario ja esta em uso" });
}
const token = crypto.randomUUID();
const passwordHash = hashPassword(password);
const rows = await sql`INSERT INTO leads (name, email, phone, cnpj, status, token, username, password_hash, details) VALUES (${name}, ${email}, ${phone || null}, ${cnpj || null}, 'pending', ${token}, ${username}, ${passwordHash}, ${details}) RETURNING id, status`;
res.setHeader("Set-Cookie", "lead_token=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=15552000");
return res.status(200).json({ status: rows[0] ? rows[0].status : "pending" });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao registrar cadastro" });
}
}