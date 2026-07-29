import { Link } from "wouter";

const GARGANTILHAS_IMAGES = [
  "/images/gargantilhas-1.jpg",
  "/images/gargantilhas-2.jpg",
  "/images/gargantilhas-3.jpg",
];

export default function Gargantilhas() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ padding: "1.5rem" }}>
        <Link href="/" style={{ color: "#1A1A1A", textDecoration: "none", fontSize: "0.95rem" }}>
          Voltar ao catálogo
        </Link>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.5rem", textAlign: "center" }}>
          Nossa Coleção
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A1A", marginBottom: "2.5rem", textAlign: "center" }}>
          Gargantilhas
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {GARGANTILHAS_IMAGES.map((src, i) => (
            <div key={src}>
<div style={{ aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "2px", background: "#F5F0E8" }}>
<img
src={src}
alt={"Gargantilha Guindani " + (i + 1)}
style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
/>
</div>
{i === 0 && (
<p
style={{
fontFamily: "'Lato', sans-serif",
fontSize: "0.85rem",
color: "#1A1A1A",
textAlign: "center",
marginTop: "0.75rem",
}}
>
CÓDIGO 6080877 GARGANTILHA AU 750 CANUTILHOS PESO MÉDIO 6,15GRS
</p>
)}
</div>
          ))}
        </div>
      </div>
    </div>
  );
}
