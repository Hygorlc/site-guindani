import { useEffect, useState } from "react";

type Lead = {
id: number;
name: string;
email: string;
phone: string | null;
cnpj: string | null;
status: string;
created_at: string;
};

export default function Admin() {
const [authed, setAuthed] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [leads, setLeads] = useState<Lead[]>([]);
const [loading, setLoading] = useState(false);
const [showForm, setShowForm] = useState(false);
const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", cnpj: "" });
const [creating, setCreating] = useState(false);
const [createError, setCreateError] = useState("");

async function loadLeads() {
setLoading(true);
try {
const res = await fetch("/api/admin/leads");
if (res.status === 401) {
setAuthed(false);
setLoading(false);
return;
}
const json = await res.json();
setLeads(json.leads || []);
setAuthed(true);
} catch (err) {}
setLoading(false);
}

useEffect(function () {
loadLeads();
}, []);

async function handleLogin(e: React.FormEvent) {
e.preventDefault();
setError("");
try {
const res = await fetch("/api/admin/login", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ username: username, password: password }),
});
if (!res.ok) {
setError("Usuario ou senha incorretos");
return;
}
setUsername("");
setPassword("");
loadLeads();
} catch (err) {
setError("Erro ao entrar");
}
}

async function handleDecision(id: number, status: string) {
await fetch("/api/admin/approve", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id: id, status: status }),
});
loadLeads();
}

async function handleCreateLead(e: React.FormEvent) {
e.preventDefault();
setCreateError("");
if (!newLead.name || !newLead.email) {
setCreateError("Nome e email sao obrigatorios");
return;
}
setCreating(true);
try {
const res = await fetch("/api/admin/create-lead", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newLead),
});
if (!res.ok) {
setCreateError("Erro ao criar cadastro");
setCreating(false);
return;
}
setNewLead({ name: "", email: "", phone: "", cnpj: "" });
setShowForm(false);
loadLeads();
} catch (err) {
setCreateError("Erro ao criar cadastro");
}
setCreating(false);
}

if (!authed) {
return (
<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1A1A1A" }}>
<form onSubmit={handleLogin} style={{ background: "#fff", padding: "32px", borderRadius: "4px", width: "320px" }}>
<h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: "16px" }}>Painel Admin</h1>
<input
type="text"
placeholder="Usuario"
value={username}
onChange={function (e) { setUsername(e.target.value); }}
style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "2px" }}
/>
<input
type="password"
placeholder="Senha"
value={password}
onChange={function (e) { setPassword(e.target.value); }}
style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "2px" }}
/>
{error ? <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p> : null}
<button type="submit" style={{ width: "100%", cursor: "pointer", border: "none", padding: "10px", background: "#1A1A1A", color: "#fff", borderRadius: "2px" }}>
Entrar
</button>
</form>
</div>
);
}

return (
<div style={{ minHeight: "100vh", background: "#f7f5f2", padding: "32px" }}>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
<h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>Cadastros do Catalogo</h1>
<button onClick={function () { setShowForm(!showForm); }} style={{ cursor: "pointer", border: "none", padding: "10px 16px", background: "#C9A96E", color: "#1A1A1A", borderRadius: "2px" }}>
{showForm ? "Cancelar" : "Adicionar Cadastro"}
</button>
</div>
{showForm ? (
<form onSubmit={handleCreateLead} style={{ background: "#fff", padding: "20px", borderRadius: "4px", marginBottom: "24px", maxWidth: "420px" }}>
<input
type="text"
placeholder="Nome completo"
value={newLead.name}
onChange={function (e) { setNewLead({ name: e.target.value, email: newLead.email, phone: newLead.phone, cnpj: newLead.cnpj }); }}
style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "2px" }}
/>
<input
type="email"
placeholder="E-mail"
value={newLead.email}
onChange={function (e) { setNewLead({ name: newLead.name, email: e.target.value, phone: newLead.phone, cnpj: newLead.cnpj }); }}
style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "2px" }}
/>
<input
type="text"
placeholder="Telefone"
value={newLead.phone}
onChange={function (e) { setNewLead({ name: newLead.name, email: newLead.email, phone: e.target.value, cnpj: newLead.cnpj }); }}
style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "2px" }}
/>
<input
type="text"
placeholder="CNPJ"
value={newLead.cnpj}
onChange={function (e) { setNewLead({ name: newLead.name, email: newLead.email, phone: newLead.phone, cnpj: e.target.value }); }}
style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "2px" }}
/>
{createError ? <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "10px" }}>{createError}</p> : null}
<button type="submit" disabled={creating} style={{ cursor: "pointer", border: "none", padding: "10px 16px", background: "#1A1A1A", color: "#fff", borderRadius: "2px" }}>
{creating ? "Salvando..." : "Salvar Cadastro"}
</button>
</form>
) : null}
{loading ? <p>Carregando...</p> : null}
<table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
<thead>
<tr style={{ textAlign: "left", borderBottom: "2px solid #C9A96E" }}>
<th style={{ padding: "10px" }}>Nome</th>
<th style={{ padding: "10px" }}>Email</th>
<th style={{ padding: "10px" }}>Telefone</th>
<th style={{ padding: "10px" }}>CNPJ</th>
<th style={{ padding: "10px" }}>Status</th>
<th style={{ padding: "10px" }}>Acoes</th>
</tr>
</thead>
<tbody>
{leads.map(function (lead) {
return (
<tr key={lead.id} style={{ borderBottom: "1px solid #eee" }}>
<td style={{ padding: "10px" }}>{lead.name}</td>
<td style={{ padding: "10px" }}>{lead.email}</td>
<td style={{ padding: "10px" }}>{lead.phone}</td>
<td style={{ padding: "10px" }}>{lead.cnpj}</td>
<td style={{ padding: "10px" }}>{lead.status}</td>
<td style={{ padding: "10px" }}>
{lead.status !== "approved" ? (
<button onClick={function () { handleDecision(lead.id, "approved"); }} style={{ marginRight: "8px", cursor: "pointer" }}>
Aprovar
</button>
) : null}
{lead.status !== "rejected" ? (
<button onClick={function () { handleDecision(lead.id, "rejected"); }} style={{ cursor: "pointer" }}>
Rejeitar
</button>
) : null}
</td>
</tr>
);
})}
</tbody>
</table>
</div>
);
}