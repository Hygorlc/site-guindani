import { useEffect, useState } from "react";

type Lead = {
id: number;
name: string;
email: string;
phone: string | null;
cnpj: string | null;
  details: string | null;
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
const [createError, setCreateError] = useState(""); const [tab, setTab] = useState("leads"); const [products, setProducts] = useState<{ id: number; category: string; image_url: string; description: string }[]>([]); const [prodCategory, setProdCategory] = useState("correntes"); const [prodDescription, setProdDescription] = useState(""); const [prodFile, setProdFile] = useState<File | null>(null); const [prodError, setProdError] = useState(""); const [uploading, setUploading] = useState(false);
const [carouselSlides, setCarouselSlides] = useState<{ id: number; image_url: string; title: string; subtitle: string; cta: string }[]>([]);
const [carouselFile, setCarouselFile] = useState<File | null>(null);
const [carouselTitle, setCarouselTitle] = useState("");
const [carouselSubtitle, setCarouselSubtitle] = useState("");
const [carouselCta, setCarouselCta] = useState("");
const [carouselError, setCarouselError] = useState("");
const [carouselUploading, setCarouselUploading] = useState(false);
const [prodImgDims, setProdImgDims] = useState<{ [key: number]: { w: number; h: number } }>({});
const [carouselImgDims, setCarouselImgDims] = useState<{ [key: number]: { w: number; h: number } }>({});

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
loadLeads(); loadProducts(); loadCarousel();
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
loadLeads(); loadProducts(); loadCarousel();
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
loadLeads(); loadProducts();
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
loadLeads(); loadProducts();
} catch (err) {
setCreateError("Erro ao criar cadastro");
}
setCreating(false);
}

async function loadProducts() { try { const res = await fetch("/api/admin/products"); if (res.status === 401) { setAuthed(false); return; } const json = await res.json(); setProducts(json.products || []); } catch (err) {} } async function handleAddProduct(e: React.FormEvent) { e.preventDefault(); setProdError(""); if (!prodFile || !prodDescription) { setProdError("Selecione uma imagem e escreva a descricao"); return; } setUploading(true); try { const reader = new FileReader(); const dataUrl: string = await new Promise(function (resolve, reject) { reader.onload = function () { resolve(reader.result as string); }; reader.onerror = reject; reader.readAsDataURL(prodFile as File); }); const uploadRes = await fetch("/api/admin/upload-image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: dataUrl, filename: (prodFile as File).name }) }); const uploadJson = await uploadRes.json(); if (!uploadRes.ok) { setProdError(uploadJson.error || "Erro ao enviar imagem"); setUploading(false); return; } const createRes = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category: prodCategory, image_url: uploadJson.url, description: prodDescription }) }); if (!createRes.ok) { setProdError("Erro ao salvar produto"); setUploading(false); return; } setProdDescription(""); setProdFile(null); loadProducts(); } catch (err) { setProdError("Erro ao adicionar produto"); } setUploading(false); } async function loadCarousel() {
try {
const res = await fetch("/api/admin/products?resource=carousel");
if (res.status === 401) {
setAuthed(false);
return;
}
const json = await res.json();
setCarouselSlides(json.slides || []);
} catch (err) {}
}

async function handleAddCarouselSlide(e: React.FormEvent) {
e.preventDefault();
setCarouselError("");
if (!carouselFile) {
setCarouselError("Selecione uma imagem");
return;
}
setCarouselUploading(true);
try {
const reader = new FileReader();
const dataUrl: string = await new Promise(function (resolve, reject) {
reader.onload = function () { resolve(reader.result as string); };
reader.onerror = reject;
reader.readAsDataURL(carouselFile as File);
});
const uploadRes = await fetch("/api/admin/upload-image", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ image: dataUrl, filename: (carouselFile as File).name }),
});
const uploadJson = await uploadRes.json();
if (!uploadRes.ok) {
setCarouselError(uploadJson.error || "Erro ao enviar imagem");
setCarouselUploading(false);
return;
}
const createRes = await fetch("/api/admin/products", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resource: "carousel", image_url: uploadJson.url, title: carouselTitle, subtitle: carouselSubtitle, cta: carouselCta }),
});
if (!createRes.ok) {
setCarouselError("Erro ao salvar imagem do carrossel");
setCarouselUploading(false);
return;
}
setCarouselTitle("");
setCarouselSubtitle("");
setCarouselCta("");
setCarouselFile(null);
loadCarousel();
} catch (err) {
setCarouselError("Erro ao adicionar imagem");
}
setCarouselUploading(false);
}

async function handleDeleteCarouselSlide(id: number) {
await fetch("/api/admin/products", {
method: "DELETE",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resource: "carousel", id: id }),
});
loadCarousel();
}

async function handleDeleteProduct(id: number) { await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) }); loadProducts(); } if (!authed) {
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
<div style={{ minHeight: "100vh", background: "#f7f5f2", padding: "32px" }}><div style={{ marginBottom: "20px", display: "flex", gap: "8px" }}><button onClick={function () { setTab("leads"); }} style={{ padding: "8px 16px", background: tab === "leads" ? "#1A1A1A" : "#fff", color: tab === "leads" ? "#fff" : "#1A1A1A", border: "1px solid #1A1A1A", borderRadius: "2px", cursor: "pointer" }}>Cadastros</button><button onClick={function () { setTab("produtos"); }} style={{ padding: "8px 16px", background: tab === "produtos" ? "#1A1A1A" : "#fff", color: tab === "produtos" ? "#fff" : "#1A1A1A", border: "1px solid #1A1A1A", borderRadius: "2px", cursor: "pointer" }}>Produtos</button><button onClick={function () { setTab("carrossel"); }} style={{ padding: "8px 16px", background: tab === "carrossel" ? "#1A1A1A" : "#fff", color: tab === "carrossel" ? "#fff" : "#1A1A1A", border: "1px solid #1A1A1A", borderRadius: "2px", cursor: "pointer" }}>Carrossel</button></div>{tab === "leads" && (<>
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
<th style={{ padding: "10px" }}>Detalhes</th>
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
<td style={{ padding: "10px", fontSize: "0.75rem", maxWidth: "260px" }}>{(function () { if (!lead.details) return "-"; try { const d = JSON.parse(lead.details); return [d.razaoSocial ? "Razao Social: " + d.razaoSocial : "", d.ie ? "IE: " + d.ie : "", d.ramoDesde ? "No ramo desde: " + d.ramoDesde : "", d.endereco ? "Endereco: " + d.endereco : "", (d.cidade || d.uf) ? "Cidade/UF: " + d.cidade + "/" + d.uf : "", d.cep ? "CEP: " + d.cep : "", d.contato ? "Contato: " + d.contato : "", d.ref1Empresa ? "Ref1: " + d.ref1Empresa + " " + d.ref1CidadeUf + " " + d.ref1Telefone : "", d.ref2Empresa ? "Ref2: " + d.ref2Empresa + " " + d.ref2CidadeUf + " " + d.ref2Telefone : "", d.ref3Empresa ? "Ref3: " + d.ref3Empresa + " " + d.ref3CidadeUf + " " + d.ref3Telefone : "", d.dataFormulario ? "Data: " + d.dataFormulario : ""].filter(Boolean).join(" | "); } catch (e) { return "-"; } })()}</td>
<td style={{ padding: "10px" }}>{lead.status}</td>
<td style={{ padding: "10px" }}><div onClick={function () { handleDecision(lead.id, lead.status === "approved" ? "rejected" : "approved"); }} title={lead.status === "approved" ? "Aprovado (clique para desativar)" : "Nao aprovado (clique para ativar)"} style={{ width: "44px", height: "24px", borderRadius: "9999px", background: lead.status === "approved" ? "#C9A96E" : "#ccc", position: "relative", cursor: "pointer", display: "inline-block", transition: "background 0.2s" }}><div style={{ width: "18px", height: "18px", borderRadius: "9999px", background: "#fff", position: "absolute", top: "3px", left: lead.status === "approved" ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} /></div></td>
</tr>
);
})}
</tbody>
</table></>)}{tab === "produtos" && (<><div><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "20px" }}>Produtos das Categorias</h1><form onSubmit={handleAddProduct} style={{ background: "#fff", padding: "20px", borderRadius: "4px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}>{prodError && (<p style={{ color: "red", fontSize: "0.85rem" }}>{prodError}</p>)}<select value={prodCategory} onChange={function (e) { setProdCategory(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }}><option value="correntes">Correntes</option><option value="gargantilhas">Gargantilhas</option><option value="brincos">Brincos</option><option value="pulseiras">Pulseiras</option><option value="aneis">Aneis</option><option value="pingentes">Pingentes</option></select><input id="prodFileInput" type="file" accept="image/*" onChange={function (e) { setProdFile(e.target.files ? e.target.files[0] : null); }} style={{ display: "none" }} /><button type="button" onClick={function () { const el = document.getElementById("prodFileInput"); if (el) { el.click(); } }} style={{ padding: "10px 16px", border: "1px solid #ccc", borderRadius: "4px", background: "#fff", cursor: "pointer", marginRight: "10px" }}>Selecionar Imagem</button><span style={{ fontSize: "0.85rem", color: "#555" }}>{prodFile ? prodFile.name : "Nenhum arquivo escolhido"}</span><input type="text" placeholder="Codigo e descricao do produto" value={prodDescription} onChange={function (e) { setProdDescription(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><button type="submit" disabled={uploading} style={{ padding: "10px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: "2px", cursor: "pointer" }}>{uploading ? "Enviando..." : "Adicionar Produto"}</button></form><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>{products.map(function (p) { return (<div key={p.id} style={{ background: "#fff", padding: "12px", borderRadius: "4px" }}><img src={p.image_url} alt={p.description} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "2px", marginBottom: "8px" }} onLoad={function (e) { const img = e.target as HTMLImageElement; setProdImgDims(function (prev) { return Object.assign({}, prev, { [p.id]: { w: img.naturalWidth, h: img.naturalHeight } }); }); }} /><p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}>{prodImgDims[p.id] ? (prodImgDims[p.id].w + " x " + prodImgDims[p.id].h + " px") : "Carregando tamanho..."}</p><p style={{ fontSize: "0.75rem", color: "#C9A96E", textTransform: "uppercase", fontWeight: 700 }}>{p.category}</p><p style={{ fontSize: "0.85rem", marginBottom: "8px" }}>{p.description}</p><button onClick={function () { handleDeleteProduct(p.id); }} style={{ padding: "6px 12px", background: "#fff", color: "#c00", border: "1px solid #c00", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem" }}>Excluir</button></div>); })}</div></div></>)}
{tab === "carrossel" && (<><div><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "20px" }}>Carrossel do Site</h1><form onSubmit={handleAddCarouselSlide} style={{ background: "#fff", padding: "20px", borderRadius: "4px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}>{carouselError && (<p style={{ color: "red", fontSize: "0.85rem" }}>{carouselError}</p>)}<input id="carouselFileInput" type="file" accept="image/*" onChange={function (e) { setCarouselFile(e.target.files ? e.target.files[0] : null); }} style={{ display: "none" }} /><button type="button" onClick={function () { const el = document.getElementById("carouselFileInput"); if (el) { el.click(); } }} style={{ padding: "10px 16px", border: "1px solid #ccc", borderRadius: "4px", background: "#fff", cursor: "pointer" }}>Selecionar Imagem</button><span style={{ fontSize: "0.85rem", color: "#555" }}>{carouselFile ? carouselFile.name : "Nenhum arquivo escolhido"}</span><input type="text" placeholder="Titulo (opcional)" value={carouselTitle} onChange={function (e) { setCarouselTitle(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><input type="text" placeholder="Subtitulo (opcional)" value={carouselSubtitle} onChange={function (e) { setCarouselSubtitle(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><input type="text" placeholder="Texto do botao (opcional)" value={carouselCta} onChange={function (e) { setCarouselCta(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><button type="submit" disabled={carouselUploading} style={{ padding: "10px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: "2px", cursor: "pointer" }}>{carouselUploading ? "Enviando..." : "Adicionar ao Carrossel"}</button></form><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>{carouselSlides.map(function (s) { return (<div key={s.id} style={{ background: "#fff", padding: "12px", borderRadius: "4px" }}><img src={s.image_url} alt={s.title} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "2px", marginBottom: "8px" }} onLoad={function (e) { const img = e.target as HTMLImageElement; setCarouselImgDims(function (prev) { return Object.assign({}, prev, { [s.id]: { w: img.naturalWidth, h: img.naturalHeight } }); }); }} /><p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}>{carouselImgDims[s.id] ? (carouselImgDims[s.id].w + " x " + carouselImgDims[s.id].h + " px") : "Carregando tamanho..."}</p>{s.title && (<p style={{ fontSize: "0.85rem", marginBottom: "8px" }}>{s.title}</p>)}<button onClick={function () { handleDeleteCarouselSlide(s.id); }} style={{ padding: "6px 12px", background: "#fff", color: "#c00", border: "1px solid #c00", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem" }}>Excluir</button></div>); })}</div></div></>)}
</div>
);
}

