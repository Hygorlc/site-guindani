import { Link } from "wouter";
import ZoomImage from "../components/ZoomImage"; import { useEffect, useState } from "react";

const PULSEIRAS_IMAGES = [
  "/images/pulseiras-1.jpg",
  "/images/pulseiras-2.jpg",
  "/images/pulseiras-3.jpg",
];

export default function Pulseiras() { const [extraProducts, setExtraProducts] = useState<{ id: number; category: string; image_url: string; description: string }[]>([]); useEffect(function () { fetch("/api/products?category=pulseiras").then(function (r) { return r.json(); }).then(function (data) { setExtraProducts(data.products || []); }).catch(function () {}); }, []);
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
          Pulseiras
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {PULSEIRAS_IMAGES.map((src, i) => (
            <div key={src}><ZoomImage src={src} alt={"Pulseira Guindani " + (i + 1)} />{i === 0 && (<p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#1A1A1A", textAlign: "center", marginTop: "0.75rem" }}>CÓDIGO 9058477 PULSEIRA AU 750 PESO MÉDIO 8,00GRS</p>)}{i === 1 && (<p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#1A1A1A", textAlign: "center", marginTop: "0.75rem" }}>CÓDIGO 9058377 PULSEIRA AU 750 MADREPÉROLA PESO MÉDIO 3,85GRS</p>)}{i === 2 && (<p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#1A1A1A", textAlign: "center", marginTop: "0.75rem" }}>CÓDIGO 9058578 PULSEIRA AU 750 0,45KD DIAMANTES PESO MÉDIO 5,72GRS</p>)}</div>
          ))} {extraProducts.map(function (p) { return (<div key={"extra-" + p.id}><ZoomImage src={p.image_url} alt={p.description} zoomScale={3} /><p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#1A1A1A", textAlign: "center", marginTop: "0.75rem" }}>{p.description}</p></div>); })}
        </div>
      </div>
    </div>
  );
}
