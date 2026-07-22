import { Link } from "wouter";
import { useState } from "react";

const IMG_URL = "/images/pulseira-elos-geometricos-dourada.jpg";

const CARACTERISTICAS = [
"Design: Elos retangulares com detalhes em esferas.",
"Acabamento: Dourado polido de alto brilho.",
"Fecho: Mosquetão.",
"Estilo: Moderno, minimalista e sofisticado.",
"Indicação: Uso diário ou ocasiões especiais.",
];

const MATERIAIS = [
"Ouro 18K (se for joia).",
"Prata 925 com banho de ouro 18K.",
"Aço inoxidável 316L com banho PVD dourado.",
"Liga metálica com banho dourado.",
];

export default function ProdutoPulseiraElos() {
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: any) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: x, y: y });
  }

return (
<div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Lato', sans-serif" }}>
<div style={{ padding: "1.5rem" }}>
<Link href="/" style={{ color: "#1A1A1A", textDecoration: "none", fontSize: "0.95rem" }}>

← Voltar ao catálogo
</Link>
</div>
<div style={{ maxWidth: "720px", margin: "0 auto", padding: "1rem 1.5rem 4rem" }}>
<div
  onMouseEnter={() => setZoomActive(true)}
    onMouseLeave={() => setZoomActive(false)}
      onMouseMove={handleMouseMove}
        style={{
            width: "100%",
                maxWidth: "480px",
                    aspectRatio: "1 / 1",
                        margin: "0 auto 2rem",
                            overflow: "hidden",
                                borderRadius: "4px",
                                    cursor: "zoom-in",
                                        position: "relative",
                                          }}
                                          >
                                            <img
                                                src={IMG_URL}
                                                    alt="Pulseira Elos Geometricos Dourada"
                                                        style={{
                                                              width: "100%",
                                                                    height: "100%",
                                                                          objectFit: "cover",
                                                                                objectPosition: "center 42%",
                                                                                      display: "block",
                                                                                            transform: zoomActive ? "scale(2.2)" : "scale(1)",
                                                                                                  transformOrigin: zoomPos.x + "% " + zoomPos.y + "%",
                                                                                                        transition: zoomActive ? "none" : "transform 0.25s ease-out",
                                                                                                            }}
                                                                                                              />
                                                                                                              </div>
                                                                                                              
<h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#1A1A1A", marginBottom: "1rem" }}>
Pulseira Elos Geométricos Dourada
</h1>
<p style={{ lineHeight: 1.8, color: "#333", marginBottom: "1rem" }}>
A Pulseira Elos Geométricos combina elegância contemporânea com um design sofisticado. Seu acabamento dourado de alto brilho destaca os elos retangulares alongados, intercalados por delicadas esferas metálicas, criando um visual moderno e refinado. O fecho tipo mosquetão garante praticidade e segurança no uso.
</p>
<p style={{ lineHeight: 1.8, color: "#333", marginBottom: "1.5rem" }}>
Ideal para compor produções casuais ou sofisticadas, pode ser usada sozinha para um estilo minimalista ou combinada com outras pulseiras para um mix elegante.
</p>
<h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1A1A1A", marginBottom: "0.5rem" }}>
    Características
    </h2>
    <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.25rem", color: "#333", lineHeight: 1.8 }}>
    {CARACTERISTICAS.map((c) => (
    <li key={c}>{c}</li>
    ))}
    </ul>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1A1A1A", marginBottom: "0.5rem" }}>
        Material
        </h2>
        <p style={{ lineHeight: 1.8, color: "#333", marginBottom: "0.5rem" }}>
        Não é possível identificar o material apenas pela foto. Dependendo do fabricante, ela pode ser:
        </p>
        <ul style={{ paddingLeft: "1.25rem", color: "#333", lineHeight: 1.8 }}>
        {MATERIAIS.map((m) => (
        <li key={m}>{m}</li>
        ))}
        </ul>
        </div>
        </div>
        );
        }
        