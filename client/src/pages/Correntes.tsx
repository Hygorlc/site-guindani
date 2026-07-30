import { Link } from "wouter";
import ZoomImage from "../components/ZoomImage";

const CORRENTES_IMAGES = [
  "/images/correntes-1.jpg",
  "/images/correntes-2.jpg",
  "/images/correntes-3.jpg",
];

export default function Correntes() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ padding: "1.5rem" }}>
        <Link href="/" style={{ color: "#1A1A1A", textDecoration: "none", fontSize: "0.95rem" }}>
          Voltar ao catálogo
        </Link>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 1.5rem 4rem" }}>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Nossa Coleção
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#1A1A1A",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          Correntes
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {CORRENTES_IMAGES.map((src, i) => (
<div key={src}>
<ZoomImage src={src} alt={"Corrente Guindani " + (i + 1)} zoomScale={3} />
{i === 2 && (
<p
style={{
fontFamily: "'Lato', sans-serif",
fontSize: "0.85rem",
color: "#1A1A1A",
textAlign: "center",
marginTop: "0.75rem",
}}
>
CÓDIGO 4028677 CORRENTE 45CM 1,20KD DIAMANTES PESO MÉDIO 13,55GRS
</p>
)}
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
CÓDIGO 4028377 CORRENTE AU 750 45CM PESO MÉDIO 13,43GR
</p>
)}
{i === 1 && (
<p
style={{
fontFamily: "'Lato', sans-serif",
fontSize: "0.85rem",
color: "#1A1A1A",
textAlign: "center",
marginTop: "0.75rem",
}}
>
CÓDIGO 4028077 CORRENTE AU 750 45CM PESO MÉDIO 5,47GRS
</p>
)}
</div>
          ))}
        </div>
      </div>
    </div>
  );
}
