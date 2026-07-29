import { Link } from "wouter";
import ZoomImage from "../components/ZoomImage";

const BRINCOS_IMAGES = [
  "/images/brincos-1.jpg",
  "/images/brincos-2.jpg",
  "/images/brincos-3.jpg",
];

export default function Brincos() {
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
          Brincos
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {BRINCOS_IMAGES.map((src, i) => (
            <div key={src}><ZoomImage src={src} alt={"Brinco Guindani " + (i + 1)} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}
