import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown, ImagePlus } from "lucide-react";

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
const [sessionExpired, setSessionExpired] = useState(false);
const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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
const [carouselSaving, setCarouselSaving] = useState(false);
const [carouselNotice, setCarouselNotice] = useState("");
const [carouselAction, setCarouselAction] = useState<{ id: number; type: "delete" | "replace" } | null>(null);
const replaceCarouselInput = useRef<HTMLInputElement>(null);
const replaceCarouselId = useRef<number | null>(null);
const [prodImgDims, setProdImgDims] = useState<{ [key: number]: { w: number; h: number } }>({});
const [carouselImgDims, setCarouselImgDims] = useState<{ [key: number]: { w: number; h: number } }>({});

async function loadLeads(options?: { silent?: boolean }) {
const silent = options ? options.silent === true : false;
if (!silent) setLoading(true);
try {
const res = await fetch("/api/admin/leads", { cache: "no-store" });
if (res.status === 401) {
setAuthed(false);
setSessionExpired(true);
setLoading(false);
return;
}
const json = await res.json();
setLeads(json.leads || []);
setAuthed(true);
setSessionExpired(false);
setLastUpdated(new Date());
} catch (err) {}
if (!silent) setLoading(false);
}

useEffect(function () {
loadLeads(); loadProducts(); loadCarousel();
}, []);

// Mantem a lista viva: recarrega a cada 30s e sempre que a aba volta a ficar visivel.
// Sem isso, uma aba aberta ha horas continua mostrando a lista antiga e os cadastros
// novos parecem nao ter chegado.
useEffect(function () {
if (!authed) return;
function refresh() {
loadLeads({ silent: true });
}
function onVisibilityChange() {
if (document.visibilityState === "visible") refresh();
}
const timer = window.setInterval(refresh, 30000);
document.addEventListener("visibilitychange", onVisibilityChange);
window.addEventListener("focus", refresh);
return function () {
window.clearInterval(timer);
document.removeEventListener("visibilitychange", onVisibilityChange);
window.removeEventListener("focus", refresh);
};
}, [authed]);

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
setSessionExpired(false);
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

async function handleResetPassword(id: number) {
const newPassword = window.prompt("Digite a nova senha para este cadastro (minimo 6 caracteres):");
if (!newPassword) return;
if (newPassword.length < 6) {
alert("A senha deve ter pelo menos 6 caracteres");
return;
}
const res = await fetch("/api/admin/leads", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id: id, newPassword: newPassword }),
});
if (!res.ok) {
alert("Erro ao redefinir senha");
return;
}
alert("Senha redefinida com sucesso");
}

async function handleDeleteLead(id: number) {
if (!window.confirm("Tem certeza que deseja excluir este cadastro? Esta acao nao pode ser desfeita.")) return;
const res = await fetch("/api/admin/leads", {
method: "DELETE",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id: id }),
});
if (!res.ok) {
alert("Erro ao excluir cadastro");
return;
}
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
loadLeads(); loadProducts();
} catch (err) {
setCreateError("Erro ao criar cadastro");
}
setCreating(false);
}

async function loadProducts() { try { const res = await fetch("/api/admin/products", { cache: "no-store" }); if (res.status === 401) { setAuthed(false); setSessionExpired(true); return; } const json = await res.json(); setProducts(json.products || []); } catch (err) {} } async function handleAddProduct(e: React.FormEvent) { e.preventDefault(); setProdError(""); if (!prodFile || !prodDescription) { setProdError("Selecione uma imagem e escreva a descricao"); return; } setUploading(true); try { const reader = new FileReader(); const dataUrl: string = await new Promise(function (resolve, reject) { reader.onload = function () { resolve(reader.result as string); }; reader.onerror = reject; reader.readAsDataURL(prodFile as File); }); const uploadRes = await fetch("/api/admin/upload-image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: dataUrl, filename: (prodFile as File).name }) }); const uploadJson = await uploadRes.json(); if (!uploadRes.ok) { setProdError(uploadJson.error || "Erro ao enviar imagem"); setUploading(false); return; } const createRes = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category: prodCategory, image_url: uploadJson.url, description: prodDescription }) }); if (!createRes.ok) { setProdError("Erro ao salvar produto"); setUploading(false); return; } setProdDescription(""); setProdFile(null); loadProducts(); } catch (err) { setProdError("Erro ao adicionar produto"); } setUploading(false); } async function loadCarousel() {
try {
const res = await fetch("/api/admin/products?resource=carousel", { cache: "no-store" });
if (res.status === 401) {
setAuthed(false);
setSessionExpired(true);
return;
}
const json = await res.json();
if (!res.ok) throw new Error(json.error || "Erro ao carregar carrossel");
setCarouselSlides(json.slides || []);
} catch (err) { setCarouselError("Nao foi possivel carregar o carrossel. Tente novamente."); }
}

function notifyCarouselUpdate() {
try { localStorage.setItem("guindani_carousel_updated", String(Date.now())); } catch {}
}

async function carouselResponse(res: Response, fallback: string) {
const json = await res.json().catch(() => null);
if (res.status === 401) { setAuthed(false); setSessionExpired(true); }
if (!res.ok || !json || json.ok === false) throw new Error(json?.error || fallback);
return json;
}

async function uploadCarouselImage(file: File): Promise<string> {
if (file.type && !file.type.startsWith("image/")) throw new Error("Selecione um arquivo de imagem.");
const reader = new FileReader();
const dataUrl = await new Promise<string>((resolve, reject) => {
reader.onload = () => resolve(reader.result as string);
reader.onerror = () => reject(new Error("Nao foi possivel ler a imagem."));
reader.readAsDataURL(file);
});
const res = await fetch("/api/admin/upload-image", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ image: dataUrl, filename: file.name }),
});
const json = await carouselResponse(res, "Nao foi possivel enviar a imagem.");
if (typeof json.url !== "string" || !json.url) throw new Error("O envio nao retornou a imagem salva.");
return json.url;
}

async function handleReplaceCarouselImage(id: number, file: File) {
if (carouselSaving || carouselUploading) return;
setCarouselSaving(true);
setCarouselAction({ id, type: "replace" });
setCarouselError("");
setCarouselNotice("");
try {
const imageUrl = await uploadCarouselImage(file);
const res = await fetch("/api/admin/products?resource=carousel", {
method: "PATCH",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resource: "carousel", id, image_url: imageUrl }),
});
const json = await carouselResponse(res, "Nao foi possivel trocar a imagem.");
if (json.slide?.id !== id) throw new Error("A troca da imagem nao foi confirmada.");
setCarouselSlides((slides) => slides.map((slide) => slide.id === id ? json.slide : slide));
setCarouselNotice("Imagem substituida.");
notifyCarouselUpdate();
} catch (err) {
setCarouselError(err instanceof Error ? err.message : "Erro ao trocar a imagem.");
} finally { setCarouselSaving(false); setCarouselAction(null); }
}

async function moveCarouselSlide(index: number, direction: -1 | 1) {
const target = index + direction;
if (carouselSaving || target < 0 || target >= carouselSlides.length) return;
const reordered = [...carouselSlides];
[reordered[index], reordered[target]] = [reordered[target], reordered[index]];
setCarouselSaving(true);
setCarouselError("");
setCarouselNotice("");
try {
const res = await fetch("/api/admin/products", {
method: "PATCH",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resource: "carousel", ids: reordered.map((slide) => slide.id) }),
});
if (!res.ok) {
if (res.status === 401) { setAuthed(false); setSessionExpired(true); }
if (res.status === 409) await loadCarousel();
const json = await res.json();
throw new Error(json.error || "Erro ao salvar ordem");
}
setCarouselSlides(reordered);
setCarouselNotice("Ordem salva.");
notifyCarouselUpdate();
} catch (err) {
setCarouselError(err instanceof Error ? err.message : "Erro ao salvar ordem");
} finally { setCarouselSaving(false); }
}

async function handleAddCarouselSlide(e: React.FormEvent) {
e.preventDefault();
if (carouselSaving || carouselUploading) return;
setCarouselError("");
setCarouselNotice("");
if (!carouselFile) {
setCarouselError("Selecione uma imagem");
return;
}
setCarouselUploading(true);
try {
const imageUrl = await uploadCarouselImage(carouselFile);
const createRes = await fetch("/api/admin/products", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resource: "carousel", image_url: imageUrl, title: carouselTitle, subtitle: carouselSubtitle, cta: carouselCta }),
});
await carouselResponse(createRes, "Erro ao salvar imagem do carrossel");
setCarouselTitle("");
setCarouselSubtitle("");
setCarouselCta("");
setCarouselFile(null);
await loadCarousel();
setCarouselNotice("Imagem adicionada.");
notifyCarouselUpdate();
} catch (err) {
setCarouselError(err instanceof Error ? err.message : "Erro ao adicionar imagem");
}
setCarouselUploading(false);
}

async function handleDeleteCarouselSlide(id: number) {
if (carouselSaving || carouselUploading) return;
setCarouselSaving(true);
setCarouselAction({ id, type: "delete" });
setCarouselError("");
setCarouselNotice("");
try {
const res = await fetch("/api/admin/products?resource=carousel&id=" + id, {
method: "DELETE",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resource: "carousel", id: id }),
});
const json = await carouselResponse(res, "Nao foi possivel excluir a imagem. Tente novamente.");
if (json.id !== id) throw new Error("A exclusao da imagem nao foi confirmada.");
setCarouselSlides((slides) => slides.filter((slide) => slide.id !== id));
setCarouselNotice("Imagem excluida.");
notifyCarouselUpdate();
} catch (err) {
setCarouselError(err instanceof Error ? err.message : "Erro ao excluir imagem");
} finally { setCarouselSaving(false); setCarouselAction(null); }
}

async function handleDeleteProduct(id: number) { await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) }); loadProducts(); } if (!authed) {
return (
<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1A1A1A" }}>
<form onSubmit={handleLogin} style={{ background: "#fff", padding: "32px", borderRadius: "4px", width: "320px" }}>
<h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: "16px" }}>Painel Admin</h1>
{sessionExpired ? (
<p style={{ background: "#fdf3e3", border: "1px solid #C9A96E", color: "#7a5b1e", fontSize: "0.8rem", padding: "10px", borderRadius: "2px", marginBottom: "12px", lineHeight: 1.5 }}>
Sua sessao expirou e a lista parou de atualizar. Entre novamente para ver os cadastros mais recentes.
</p>
) : null}
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

const pendingCount = leads.filter(function (l) { return l.status === "pending"; }).length;

return (
<div style={{ minHeight: "100vh", background: "#f7f5f2", padding: "32px" }}><div style={{ marginBottom: "20px", display: "flex", gap: "8px" }}><button onClick={function () { setTab("leads"); }} style={{ padding: "8px 16px", background: tab === "leads" ? "#1A1A1A" : "#fff", color: tab === "leads" ? "#fff" : "#1A1A1A", border: "1px solid #1A1A1A", borderRadius: "2px", cursor: "pointer" }}>Cadastros</button><button onClick={function () { setTab("produtos"); }} style={{ padding: "8px 16px", background: tab === "produtos" ? "#1A1A1A" : "#fff", color: tab === "produtos" ? "#fff" : "#1A1A1A", border: "1px solid #1A1A1A", borderRadius: "2px", cursor: "pointer" }}>Produtos</button><button onClick={function () { setTab("carrossel"); }} style={{ padding: "8px 16px", background: tab === "carrossel" ? "#1A1A1A" : "#fff", color: tab === "carrossel" ? "#fff" : "#1A1A1A", border: "1px solid #1A1A1A", borderRadius: "2px", cursor: "pointer" }}>Carrossel</button></div>{tab === "leads" && (<>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", gap: "12px", flexWrap: "wrap" }}>
<div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
<h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>Cadastros do Catalogo</h1>
{pendingCount > 0 ? (
<span style={{ background: "#C9A96E", color: "#1A1A1A", fontSize: "0.78rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", whiteSpace: "nowrap" }}>
{pendingCount} aguardando aprovacao
</span>
) : null}
</div>
<div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
{lastUpdated ? (
<span style={{ fontSize: "0.72rem", color: "#888", whiteSpace: "nowrap" }}>
Atualizado as {lastUpdated.toLocaleTimeString("pt-BR")}
</span>
) : null}
<button type="button" onClick={function () { loadLeads(); }} disabled={loading} style={{ cursor: loading ? "default" : "pointer", border: "1px solid #1A1A1A", padding: "10px 16px", background: "#fff", color: "#1A1A1A", borderRadius: "2px", opacity: loading ? 0.6 : 1 }}>
{loading ? "Atualizando..." : "Atualizar"}
</button>
<button onClick={function () { setShowForm(!showForm); }} style={{ cursor: "pointer", border: "none", padding: "10px 16px", background: "#C9A96E", color: "#1A1A1A", borderRadius: "2px" }}>
{showForm ? "Cancelar" : "Adicionar Cadastro"}
</button>
</div>
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
<th style={{ padding: "10px" }}>Senha</th>
<th style={{ padding: "10px" }}>Excluir</th>
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
<td style={{ padding: "10px" }}>
<button type="button" onClick={function () { handleResetPassword(lead.id); }} style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: "2px", background: "#fff", cursor: "pointer", fontSize: "0.8rem" }}>Redefinir senha</button>
</td>
<td style={{ padding: "10px" }}>
<button type="button" onClick={function () { handleDeleteLead(lead.id); }} style={{ padding: "6px 10px", border: "1px solid #c0392b", borderRadius: "2px", background: "#fff", color: "#c0392b", cursor: "pointer", fontSize: "0.8rem" }}>Excluir</button>
</td>
</tr>
);
})}
</tbody>
</table></>)}{tab === "produtos" && (<><div><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "20px" }}>Produtos das Categorias</h1><form onSubmit={handleAddProduct} style={{ background: "#fff", padding: "20px", borderRadius: "4px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}>{prodError && (<p style={{ color: "red", fontSize: "0.85rem" }}>{prodError}</p>)}<select value={prodCategory} onChange={function (e) { setProdCategory(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }}><option value="correntes">Correntes</option><option value="gargantilhas">Gargantilhas</option><option value="brincos">Brincos</option><option value="pulseiras">Pulseiras</option><option value="aneis">Aneis</option><option value="pingentes">Pingentes</option></select><input id="prodFileInput" type="file" accept="image/*" onChange={function (e) { setProdFile(e.target.files ? e.target.files[0] : null); }} style={{ display: "none" }} /><button type="button" onClick={function () { const el = document.getElementById("prodFileInput"); if (el) { el.click(); } }} style={{ padding: "10px 16px", border: "1px solid #ccc", borderRadius: "4px", background: "#fff", cursor: "pointer", marginRight: "10px" }}>Selecionar Imagem</button><span style={{ fontSize: "0.85rem", color: "#555" }}>{prodFile ? prodFile.name : "Nenhum arquivo escolhido"}</span><input type="text" placeholder="Codigo e descricao do produto" value={prodDescription} onChange={function (e) { setProdDescription(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><button type="submit" disabled={uploading} style={{ padding: "10px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: "2px", cursor: "pointer" }}>{uploading ? "Enviando..." : "Adicionar Produto"}</button></form>{["correntes","gargantilhas","brincos","pulseiras","aneis","pingentes"].map(function (cat) { const catLabels: Record<string, string> = { correntes: "Correntes", gargantilhas: "Gargantilhas", brincos: "Brincos", pulseiras: "Pulseiras", aneis: "Aneis", pingentes: "Pingentes" }; const catProducts = products.filter(function (p) { return p.category === cat; }); if (catProducts.length === 0) { return null; } return (<div key={cat} style={{ marginBottom: "32px" }}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", marginBottom: "12px", paddingBottom: "6px", borderBottom: "2px solid #C9A96E" }}>{catLabels[cat]}</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>{catProducts.map(function (p) { return (<div key={p.id} style={{ background: "#fff", padding: "12px", borderRadius: "4px" }}><img src={p.image_url} alt={p.description} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "2px", marginBottom: "8px" }} onLoad={function (e) { const img = e.target as HTMLImageElement; setProdImgDims(function (prev) { return Object.assign({}, prev, { [p.id]: { w: img.naturalWidth, h: img.naturalHeight } }); }); }} /><p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}>{prodImgDims[p.id] ? (prodImgDims[p.id].w + " x " + prodImgDims[p.id].h + " px") : "Carregando tamanho..."}</p><p style={{ fontSize: "0.85rem", marginBottom: "8px" }}>{p.description}</p><button onClick={function () { handleDeleteProduct(p.id); }} style={{ padding: "6px 12px", background: "#fff", color: "#c00", border: "1px solid #c00", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem" }}>Excluir</button></div>); })}</div></div>); })}</div></>)}
{tab === "carrossel" && (<><div><h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "20px" }}>Carrossel do Site</h1>{carouselNotice && <p role="status" style={{ color: "#28633b", marginBottom: "12px" }}>{carouselNotice}</p>}<input ref={replaceCarouselInput} type="file" accept="image/*" aria-label="Nova imagem do carrossel" style={{ display: "none" }} onChange={(event) => { const file = event.target.files?.[0]; const id = replaceCarouselId.current; event.target.value = ""; replaceCarouselId.current = null; if (file && id !== null) void handleReplaceCarouselImage(id, file); }} />{carouselError && <p role="alert" style={{ color: "#b3261e", marginBottom: "12px" }}>{carouselError}</p>}<form onSubmit={handleAddCarouselSlide} style={{ background: "#fff", padding: "20px", borderRadius: "4px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}><input id="carouselFileInput" type="file" accept="image/*" onChange={function (e) { setCarouselFile(e.target.files ? e.target.files[0] : null); }} style={{ display: "none" }} /><button type="button" onClick={function () { const el = document.getElementById("carouselFileInput"); if (el) { el.click(); } }} style={{ padding: "10px 16px", border: "1px solid #ccc", borderRadius: "4px", background: "#fff", cursor: "pointer" }}>Selecionar Imagem</button><span style={{ fontSize: "0.85rem", color: "#555" }}>{carouselFile ? carouselFile.name : "Nenhum arquivo escolhido"}</span><input type="text" placeholder="Titulo (opcional)" value={carouselTitle} onChange={function (e) { setCarouselTitle(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><input type="text" placeholder="Subtitulo (opcional)" value={carouselSubtitle} onChange={function (e) { setCarouselSubtitle(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><input type="text" placeholder="Texto do botao (opcional)" value={carouselCta} onChange={function (e) { setCarouselCta(e.target.value); }} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "2px" }} /><button type="submit" disabled={carouselUploading || carouselSaving} style={{ padding: "10px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: "2px", cursor: "pointer" }}>{carouselUploading ? "Enviando..." : "Adicionar ao Carrossel"}</button></form><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>{carouselSlides.map(function (s, index) { return (<div key={s.id} style={{ background: "#fff", padding: "12px", borderRadius: "4px" }}><img src={s.image_url} alt={s.title} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "2px", marginBottom: "8px" }} onLoad={function (e) { const img = e.target as HTMLImageElement; setCarouselImgDims(function (prev) { return Object.assign({}, prev, { [s.id]: { w: img.naturalWidth, h: img.naturalHeight } }); }); }} /><p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}>{carouselImgDims[s.id] ? (carouselImgDims[s.id].w + " x " + carouselImgDims[s.id].h + " px") : "Carregando tamanho..."}</p>{s.title && (<p style={{ fontSize: "0.85rem", marginBottom: "8px" }}>{s.title}</p>)}<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}><span style={{ fontSize: "0.8rem", marginRight: "auto" }}>{index + 1}</span><button type="button" title="Mover para cima" aria-label={"Mover imagem " + (index + 1) + " para cima"} disabled={carouselSaving || carouselUploading || index === 0} onClick={() => moveCarouselSlide(index, -1)} style={{ width: "32px", height: "32px", display: "grid", placeItems: "center", border: "1px solid #ccc", borderRadius: "2px", background: "#fff", opacity: carouselSaving || carouselUploading || index === 0 ? 0.4 : 1 }}><ArrowUp size={16} /></button><button type="button" title="Mover para baixo" aria-label={"Mover imagem " + (index + 1) + " para baixo"} disabled={carouselSaving || carouselUploading || index === carouselSlides.length - 1} onClick={() => moveCarouselSlide(index, 1)} style={{ width: "32px", height: "32px", display: "grid", placeItems: "center", border: "1px solid #ccc", borderRadius: "2px", background: "#fff", opacity: carouselSaving || carouselUploading || index === carouselSlides.length - 1 ? 0.4 : 1 }}><ArrowDown size={16} /></button></div><button type="button" disabled={carouselSaving || carouselUploading} onClick={() => { replaceCarouselId.current = s.id; replaceCarouselInput.current?.click(); }} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 10px", marginRight: "8px", marginBottom: "8px", border: "1px solid #999", borderRadius: "2px", background: "#fff", cursor: "pointer", fontSize: "0.8rem" }}><ImagePlus size={16} />{carouselAction?.id === s.id && carouselAction.type === "replace" ? "Trocando..." : "Trocar imagem"}</button><button type="button" disabled={carouselSaving || carouselUploading} onClick={function () { handleDeleteCarouselSlide(s.id); }} style={{ padding: "6px 12px", background: "#fff", color: "#c00", border: "1px solid #c00", borderRadius: "2px", cursor: "pointer", fontSize: "0.8rem" }}>{carouselAction?.id === s.id && carouselAction.type === "delete" ? "Excluindo..." : "Excluir"}</button></div>); })}</div></div></>)}
</div>
);
}

