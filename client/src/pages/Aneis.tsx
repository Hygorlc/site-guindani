import { Link } from "wouter";
import ZoomImage from "../components/ZoomImage";

const ANEIS_IMAGES = [
  "/images/aneis-1.jpg",
  "/images/aneis-2.jpg",
  "/images/aneis-3.jpg",
  "/images/aneis-4.jpg",
];

export default function Aneis() {
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
          Anéis
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {ANEIS_IMAGES.map((src, i) => (
            
              <div key={src}>
                <ZoomImage src={src} alt={"Anel Guindani " + (i + 1)} />
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
                  CÓDIGO 2173777  ANEL AU 750 PESO MÉDIO 5,30GRS
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
                    CÓDIGO 2174877  ANEL AU 750 PESO MÉDIO 1,50GRS
                  </p>
                )}
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
CÓDIGO 2173677  ANEL AU 750 PESO MÉDIO 3,77GRS
</p>
)}
{i === 3 && (
<p
style={{
fontFamily: "'Lato', sans-serif",
fontSize: "0.85rem",
color: "#1A1A1A",
textAlign: "center",
marginTop: "0.75rem",
}}
>
CÓDIGO 2173577  ANEL AU 750 PESO MÉDIO 3,78GRS
</p>
)}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
