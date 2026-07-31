/**
 * Guindani — Home Page
 * Design: Guindani Classique (inspirado no songa.it)
 * Paleta: Dourado Champagne #C9A96E | Preto #1A1A1A | Branco #FFFFFF
 * Tipografia: Playfair Display (títulos) + Lato (corpo)
 */

import { useEffect, useRef, useState } from "react";
import { GUINDANI_LOGO } from "../assets/guindani-logo";
// ─── Asset URLs ───────────────────────────────────────────────────────────────
import { useLocation } from "wouter";
const LOGO_URL =
  GUINDANI_LOGO;
const CATEGORIES = [
  {
    id: "aneis",
    label: "Anéis",
    img: "/images/category_aneis.jpg",
  },
  {
    id: "correntes",
    label: "Correntes",
    img: "/images/category_correntes.jpg",
  },
  {
    id: "gargantilhas",
    label: "Gargantilhas",
    img: "/images/category_gargantilhas.jpg",
  },
  {
    id: "pulseiras",
    label: "Pulseiras",
    img: "/images/pulseiras-capa.jpg",
  },
  {
    id: "pingentes",
    label: "Pingentes",
    img: "/images/category_pingentes.jpg",
  },
  {
    id: "brincos",
    label: "Brincos",
    img: "/images/category_brincos.jpg",
  },
];

const DEFAULT_HERO_SLIDES = [
  {
    img: "/images/convite-feninjer-2026.jpg",
    title: "83ª Feninjer+",
    subtitle: "17 a 20 de agosto de 2026 — Transamérica Expo Center",
    cta: "Saiba mais",
  },
  {
    img: "/images/hero-2.jpg",
    title: "Brilho Contemporâneo",
    subtitle: "Peças com cristais que impõem presença",
    cta: "Descobrir peças",
  },
  {
    img: "/images/hero-3.jpg",
    title: "Design Autêntico",
    subtitle: "Brincos que traduzem sua personalidade",
    cta: "Ver brincos",
  },
  {
    img: "/images/hero-4.jpg",
    title: "Ouro Puro, Estilo Único",
    subtitle: "Correntes e pulseiras para todos os momentos",
    cta: "Explorar coleção",
  },
  {
    img: "/images/hero-5.jpg",
    title: "Amor em Forma de Joia",
    subtitle: "Peças que eternizam sentimentos",
    cta: "Ver coleção",
  },
];

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Certificado de Autenticidade",
    desc: "Todas as peças acompanham certificado de autenticidade e garantia.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Entrega Segura",
    desc: "Embalagem especial e entrega com seguro para todo o Brasil.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Serviço de Gravação",
    desc: "Personalize sua joia com gravações e ajustes sob medida.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Atendimento Personalizado",
    desc: "Consultores especializados para ajudar na escolha da peça ideal.",
  },
];

const TABS = ["Todos", "Anéis", "Correntes", "Gargantilhas", "Pulseiras", "Brincos", "Pingentes"];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useFadeInSections() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Topbar() {
  return null;
}

function Header({ onCatalog, loggedIn, onLoginClick }: { onCatalog: () => void; loggedIn: boolean; onLoginClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [, setHeaderLocation] = useLocation();

  function handleProductSearch(e: any) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) { setSearchResults(null); return; }
    setSearching(true);
    fetch("/api/products")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        const list = (data.products || []).filter(function (p: any) {
          return p.description && p.description.toLowerCase().includes(q.toLowerCase());
        });
        setSearchResults(list);
      })
      .catch(function () { setSearchResults([]); })
      .finally(function () { setSearching(false); });
  }

  function goToProductCategory(category: string, productId: number) {
    setSearchOpen(false);
    setSearchResults(null);
    setSearchQuery("");
    sessionStorage.setItem("guindani_highlight_product", String(productId));
    setHeaderLocation("/categoria/" + category);
  }


  const navItems = [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Categorias", href: "#categorias" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "#ffffff", boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}
    >
      {/* Faixa superior: catálogo | logo | redes sociais */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 16px",
        }}
      >
        <button
          type="button"
          onClick={onCatalog}
          className="hidden md:flex"
          style={{
            position: "absolute",
            left: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#555",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "15px", height: "15px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Catálogo Online
        </button>

        <a href="#">
          <img
            src={LOGO_URL}
            alt="Guindani"
            style={{ height: "64px", width: "auto", maxWidth: "220px", objectFit: "contain" }}
          />
        </a>

        <div
          className="hidden md:flex"
          style={{
            position: "absolute",
            right: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <a href="https://www.instagram.com/guindanijoias/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#555" }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

        {loggedIn && (
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Buscar produto por codigo"
              title="Buscar produto por codigo"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: "18px", height: "18px" }}>
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
            </button>
            {searchOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  width: "280px",
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  padding: "12px",
                  zIndex: 60,
                }}
              >
                <form onSubmit={handleProductSearch} style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Codigo do produto"
                    style={{
                      flex: 1,
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: "2px",
                      padding: "6px 8px",
                      fontSize: "0.8rem",
                      fontFamily: "'Lato', sans-serif",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#C9A96E",
                      border: "none",
                      borderRadius: "2px",
                      padding: "6px 10px",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {searching ? "..." : "Buscar"}
                  </button>
                </form>
                {searchResults !== null && (
                  <div style={{ marginTop: "10px", maxHeight: "260px", overflowY: "auto" }}>
                    {searchResults.length === 0 && (
                      <p style={{ fontSize: "0.78rem", color: "#777", fontFamily: "'Lato', sans-serif" }}>
                        Nenhum produto encontrado com esse codigo.
                      </p>
                    )}
                    {searchResults.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => goToProductCategory(p.category, p.id)}
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          cursor: "pointer",
                          padding: "6px 0",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <img src={p.image_url} alt={p.description} style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "2px" }} />
                        <span style={{ fontSize: "0.72rem", color: "#333", fontFamily: "'Lato', sans-serif" }}>{p.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
<button
type="button"
onClick={onLoginClick}
style={{
background: "none",
border: "1px solid #C9A96E",
borderRadius: "2px",
padding: "5px 12px",
cursor: "pointer",
color: "#555",
fontFamily: "'Lato', sans-serif",
fontSize: "0.72rem",
fontWeight: 700,
letterSpacing: "0.05em",
textTransform: "uppercase",
}}
>
{loggedIn ? "Minha Conta" : "Login"}
</button>
        </div>

        {/* Botão menu mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className="block h-0.5 bg-neutral-800 transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <span
              className="block h-0.5 bg-neutral-800 transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 bg-neutral-800 transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
            />
          </div>
        </button>
      </div>

      {/* Barra de menu */}
      <nav
        className="hidden md:flex"
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(24px, 5vw, 64px)",
          padding: "13px 12px",
          background: "linear-gradient(180deg, #f7f6f4 0%, #eceae6 100%)",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="nav-link" style={{ color: "#6f6f6f" }}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Menu mobile */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "400px" : "0", background: "#ffffff" }}
      >
        <nav
          className="flex flex-col py-4 gap-4 border-t"
          style={{ borderColor: "rgba(0,0,0,0.08)", paddingLeft: "1.5rem" }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              style={{ color: "#6f6f6f" }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
<button
type="button"
onClick={() => {
setMenuOpen(false);
onLoginClick();
}}
className="nav-link"
style={{ color: "#6f6f6f", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
>
{loggedIn ? "Minha Conta" : "Login"}
</button>
        
          {loggedIn && (
            <div style={{ padding: "0.75rem 0", borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: "0.5rem" }}>
              <form
                onSubmit={handleProductSearch}
                style={{ display: "flex", gap: "6px" }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Codigo do produto"
                  style={{
                    flex: 1,
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderRadius: "2px",
                    padding: "6px 8px",
                    fontSize: "0.8rem",
                    fontFamily: "'Lato', sans-serif",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#C9A96E",
                    border: "none",
                    borderRadius: "2px",
                    padding: "6px 10px",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {searching ? "..." : "Buscar"}
                </button>
              </form>
              {searchResults !== null && (
                <div style={{ marginTop: "10px", maxHeight: "220px", overflowY: "auto" }}>
                  {searchResults.length === 0 && (
                    <p style={{ fontSize: "0.78rem", color: "#777", fontFamily: "'Lato', sans-serif" }}>
                      Nenhum produto encontrado com esse codigo.
                    </p>
                  )}
                  {searchResults.map((p) => (
                    <div
                      key={"m-" + p.id}
                      onClick={() => { setMenuOpen(false); goToProductCategory(p.category, p.id); }}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "6px 0",
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <img src={p.image_url} alt={p.description} style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "2px" }} />
                      <span style={{ fontSize: "0.72rem", color: "#333", fontFamily: "'Lato', sans-serif" }}>{p.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
</nav>
      </div>
    </header>
  );
}

function HeroSlider({ heroSlides }: { heroSlides: any[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "calc(100vh + 80px)",
        minHeight: "720px",
        marginTop: "-80px",
        paddingTop: "80px",
      }}
    >
      {/* Sliding track — each slide keeps its own image and transitions to the right */}
      <div
        className="absolute inset-0 flex h-full"
        style={{
          width: `${heroSlides.length * 100}%`,
          transform: `translateX(-${current * (100 / heroSlides.length)}%)`,
          transition: "transform 1.1s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full overflow-hidden"
            style={{ width: `${100 / heroSlides.length}%`, background: "#090806" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                filter: "brightness(0.42) saturate(1.05) blur(18px)",
                transform: i === current ? "scale(1.08)" : "scale(1.04)",
                transition: "transform 6.5s ease-out",
              }}
            />
            <img
              src={slide.img}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                objectPosition: "center center",
                filter: "brightness(0.84) saturate(1.06)",
                transform: i === current ? "scale(1.04)" : "scale(1)",
                transition: "transform 6.5s ease-out",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.32) 55%, transparent 100%)",
              }}
            />

            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <div
                  style={{
                    maxWidth: "600px",
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? "translateY(0)" : "translateY(18px)",
                    transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#C9A96E",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Guindani
                  </p>
                  <h1
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1.15,
                      marginBottom: "1rem",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "2rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <a href="#categorias" className="btn-gold">
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#C9A96E" : "rgba(255,255,255,0.5)",
              border: "none",
              transition: "all 0.35s ease",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function CategoriesSection({
  activeTab,
  onTabChange,
  unlocked,
  pending,
  onGate,
}: {
  activeTab: string;
  onTabChange: (t: string) => void;
  unlocked: boolean;
  pending?: boolean;
  onGate: () => void;
}) {
  const [zoomCat, setZoomCat] = useState<{ img: string; label: string } | null>(null);
  const [, setLocation] = useLocation();
  const filtered =
    activeTab === "Todos"
      ? CATEGORIES
      : CATEGORIES.filter((c) =>
          c.label.toLowerCase().includes(activeTab.toLowerCase())
        );

  return (
    <section id="categorias" className="py-16 bg-white fade-in-section">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.5rem",
            }}
          >
            Nossa Coleção
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            Categorias de Produtos
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="flex overflow-x-auto gap-0 border-b mb-8"
          style={{ borderColor: "#e8dcc8", scrollbarWidth: "none" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn${activeTab === tab ? " active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(filtered.length > 0 ? filtered : CATEGORIES).map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              style={{ aspectRatio: "4/3", borderRadius: "2px", cursor: "pointer" }}
          onClick={() => (unlocked ? (cat.id === "aneis" ? setLocation("/categoria/aneis") : cat.id === "correntes" ? setLocation("/categoria/correntes") : cat.id === "gargantilhas" ? setLocation("/categoria/gargantilhas") : cat.id === "pulseiras" ? setLocation("/categoria/pulseiras") : cat.id === "brincos" ? setLocation("/categoria/brincos") : cat.id === "pingentes" ? setLocation("/categoria/pingentes") : setZoomCat(cat)) : pending ? undefined : onGate())}
            >
              <img
                src={cat.img}
                alt={cat.label}
                style={{ filter: unlocked ? "none" : "blur(14px)", transition: "filter 0.4s ease" }}
              />
              <div className="overlay" />
              {!unlocked && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    color: "white",
                    zIndex: 2,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: "26px", height: "26px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                              {pending ? "Aguardando aprovação" : "Cadastre-se para ver"}
                  </span>
                </div>
              )}
              <div className="label">{cat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            className="btn-dark"
            style={{ cursor: "pointer", border: "none" }}
            onClick={() => !unlocked && onGate()}
          >
            {unlocked ? "Catálogo Liberado" : "Ver Catálogo"}
          </button>
        </div>

        {zoomCat && (
          <div
            onClick={() => setZoomCat(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              cursor: "zoom-out",
            }}
          >
            <div style={{ maxWidth: "820px", width: "100%", textAlign: "center" }}>
              <img
                src={zoomCat.img}
                alt={zoomCat.label}
                style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", borderRadius: "2px" }}
              />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "white", marginTop: "1rem" }}>
                {zoomCat.label}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TypewriterHeading({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [started, setStarted] = useState(false);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || chars >= text.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), 55);
    return () => clearTimeout(t);
  }, [started, chars, text.length]);

  return (
    <h2 ref={ref} style={{ ...style, position: "relative" }}>
      <span style={{ visibility: "hidden" }}>{text}</span>
      <span style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        {text.substring(0, chars)}
        {started && chars < text.length && <span className="type-cursor">|</span>}
      </span>
    </h2>
  );
}

function AboutSection() {
  return (
    <section
      id="sobre"
      className="py-20 fade-in-section"
      style={{
        background: "linear-gradient(135deg, #1A1A1A 0%, #2d2520 100%)",
        color: "white",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginBottom: "0.75rem",
              }}
            >
              Nossa História
            </p>
            <TypewriterHeading
              text={'"TRABALHAR COM SERIEDADE E QUALIDADE"'}
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            />
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Esse foi o lema que orientou a família Guindani, desde o momento que a empresa era apenas um ideal, há mais de 80 anos.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Tudo teve início pelas mãos de Achyles Guindani, que soube transmitir a seus filhos, afora o ofício de ourives.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Em 08 de janeiro de 1946, no porão da casa de Achyles, seu filho Sauro iniciava as atividades de uma pequena fábrica de joias, acompanhado posteriormente de seus irmãos Clemente, Ary e Cypriano, além de outros colaboradores.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Na época de sua criação, a sede da empresa, Cotiporã, era uma pequena vila fundada por imigrantes italianos, distante dos grandes centros comerciais e industriais.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: "0",
              }}
            >
              Hoje, a Guindani é uma das mais respeitadas indústrias de joias do Brasil, com um quadro de colaboradores consolidado e fazendo jus ao lema "Qualidade e Seriedade"!
            </p>
          </div>

          <div
            style={{
              border: "1px solid rgba(201,169,110,0.35)",
              borderRadius: "2px",
              padding: "0.5rem",
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
            }}
          >
            <video
              src="/images/nossa-historia.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Processo criativo e artesanal da Guindani"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "520px",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="servicos"
      className="py-16 fade-in-section"
      style={{ background: "#F5F0E8" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.5rem",
            }}
          >
            O que Oferecemos
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            Nossos Serviços
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="text-center p-6 bg-white"
              style={{
                borderRadius: "2px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div
                className="flex justify-center mb-4"
                style={{ color: "#C9A96E" }}
              >
                {svc.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: "0.5rem",
                }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.85rem",
                  color: "#666",
                  lineHeight: 1.6,
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Envia a mensagem por e-mail direto do navegador (FormSubmit, sem servidor)
    fetch("https://formsubmit.co/ajax/comercial@guindani.com.br", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: "Nova mensagem pelo site Guindani",
        _template: "table",
        _captcha: "false",
      }),
    }).catch(() => {});

    // Abre o WhatsApp com a mensagem
    const msg = encodeURIComponent(
      `Olá! Me chamo ${form.name}.\n\n${form.message}\n\nEmail: ${form.email}`
    );
    window.open(`https://wa.me/5551997399494?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contato" className="py-16 bg-white fade-in-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginBottom: "0.5rem",
              }}
            >
              Fale Conosco
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "#1A1A1A",
                marginBottom: "1.5rem",
              }}
            >
              Entre em Contato
            </h2>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                color: "#555",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Nossa equipe de consultores está pronta para ajudá-lo a encontrar a joia perfeita. Entre em contato pelo formulário ou diretamente pelo WhatsApp.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: "Endereço",
                  value: "Porto Alegre - RS",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  label: "Telefone / WhatsApp",
                  value: "(51) 99739-9494",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: "E-mail",
                  value: "comercial@gmail.com.br",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: "Horário",
                  value: "Seg a Sex: 08:30 às 17:30 | Sáb: 9h às 13h",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div style={{ color: "#C9A96E", marginTop: "2px", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#999",
                        marginBottom: "2px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.95rem",
                        color: "#1A1A1A",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            style={{
              background: "#F5F0E8",
              padding: "2rem",
              borderRadius: "2px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#1A1A1A",
                marginBottom: "0.5rem",
              }}
            >
              Envie sua mensagem
            </h3>

            {[
              { name: "name", label: "Seu nome", type: "text", placeholder: "Nome completo" },
              { name: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
            ].map((field) => (
              <div key={field.name}>
                <label
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#666",
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={(form as Record<string, string>)[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.9rem",
                    border: "1px solid #d4c4a8",
                    borderRadius: "2px",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.9rem",
                    color: "#1A1A1A",
                    background: "white",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A96E")}
                  onBlur={(e) => (e.target.style.borderColor = "#d4c4a8")}
                />
              </div>
            ))}

            <div>
              <label
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#666",
                  display: "block",
                  marginBottom: "0.35rem",
                }}
              >
                Mensagem
              </label>
              <textarea
                required
                rows={4}
                placeholder="Como podemos ajudá-lo?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.9rem",
                  border: "1px solid #d4c4a8",
                  borderRadius: "2px",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.9rem",
                  color: "#1A1A1A",
                  background: "white",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C9A96E")}
                onBlur={(e) => (e.target.style.borderColor = "#d4c4a8")}
              />
            </div>

            <button type="submit" className="btn-gold w-full text-center">
              {sent ? "Mensagem Enviada!" : "Enviar pelo WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    {
      title: "Nossa Empresa",
      links: ["Sobre Nós", "Nossa História", "Certificações", "Sustentabilidade"],
    },
    {
      title: "Categorias",
      links: ["Anéis", "Correntes", "Gargantilhas", "Pulseiras", "Brincos", "Diamantes"],
    },
    {
      title: "Atendimento",
      links: ["Contato", "WhatsApp", "Política de Troca", "Garantia", "FAQ"],
    },
  ];

  return (
    <footer style={{ background: "#1A1A1A", color: "white" }}>
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Guindani" className="w-16 h-16 object-contain" />
            </div>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
              }}
            >
              Joalheria de luxo com peças exclusivas em ouro 18k, prata 925 e diamantes certificados.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/guindanijoias/",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "#",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(201,169,110,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C9A96E",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#C9A96E";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  marginBottom: "1rem",
                }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#C9A96E")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © {new Date().getFullYear()} Guindani. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {["Política de Privacidade", "Termos de Uso"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#C9A96E")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5551997399494?text=Olá! Gostaria de saber mais sobre as joias da Guindani."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Fale conosco pelo WhatsApp"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        transition: "transform 0.2s ease, background 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLAnchorElement).style.background = "#1ebe5d";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.background = "#25D366";
      }}
    >
      <svg viewBox="0 0 24 24" fill="white" style={{ width: "30px", height: "30px" }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function CatalogGateModal({
  open,
  onClose,
  onUnlock,
}: {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [data, setData] = useState({ name: "", cnpj: "", razaoSocial: "", cidade: "", uf: "", cep: "", phone: "", email: "", username: "", password: "" });
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    fetch("https://formsubmit.co/ajax/comercial@guindani.com.br", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
    nome: data.name,
    email: data.email,
    cnpj_cpf: data.cnpj,
    razao_social: data.razaoSocial,
    cidade: data.cidade,
    uf: data.uf,
    cep: data.cep,
    telefone: data.phone,
        usuario: data.username,
    _subject: "Novo cadastro para acesso ao catálogo Guindani",
    _template: "table",
    _captcha: "false",
    }),
    }).catch(function () {});
    fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    }).catch(function () {}).finally(function () {
    setSending(false);
    onUnlock();
    onClose();
    });
    };
  
  const fields = [
    { key: "name", label: "Nome Completo", type: "text", placeholder: "Nome completo" },
    { key: "cnpj", label: "CNPJ/CPF", type: "text", placeholder: "CNPJ ou CPF" },
    { key: "razaoSocial", label: "Razao Social", type: "text", placeholder: "Razao Social da empresa" },
    { key: "cidade", label: "Cidade", type: "text", placeholder: "Cidade" },
    { key: "uf", label: "UF", type: "text", placeholder: "UF" },
    { key: "cep", label: "CEP", type: "text", placeholder: "00000-000" },
    { key: "phone", label: "Telefone", type: "tel", placeholder: "(51) 99999-9999" },
    { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
    { key: "username", label: "Usuario", type: "text", placeholder: "Escolha um nome de usuario" },
    { key: "password", label: "Senha", type: "password", placeholder: "Crie uma senha (min. 6 caracteres)" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <form
        autoComplete="off"
        onSubmit={handle}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "2px",
          padding: "2rem",
          width: "100%",
          maxWidth: "420px",
          borderTop: "3px solid #C9A96E",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#1A1A1A",
            marginBottom: "0.4rem",
          }}
        >
          Acesse nosso catálogo
        </h3>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.85rem",
            color: "#666",
            marginBottom: "1.25rem",
            lineHeight: 1.6,
          }}
        >
          Preencha seus dados para liberar as imagens e categorias.
        </p>
        {fields.map((f) => (
          <div key={f.key} style={{ marginBottom: "0.9rem" }}>
            <label
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#666",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              {f.label}
            </label>
            <input
              type={f.type}
              required={(f as { required?: boolean }).required !== false}
              placeholder={f.placeholder}
              autoComplete={f.type === "password" ? "new-password" : "off"}
              value={(data as Record<string, string>)[f.key]}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              style={{
                width: "100%",
                padding: "0.6rem 0.85rem",
                border: "1px solid #d4c4a8",
                borderRadius: "2px",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.9rem",
                color: "#1A1A1A",
                background: "white",
                outline: "none",
              }}
            />
          </div>
        ))}
        <button type="submit" className="btn-gold w-full text-center" disabled={sending} style={{ cursor: "pointer" }}>
          {sending ? "Enviando..." : "Liberar Catálogo"}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            display: "block",
            margin: "0.9rem auto 0",
            background: "none",
            border: "none",
            color: "#999",
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.8rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Agora não
        </button>
      </form>
    </div>
  );
}

function ClientLoginModal({
open,
onClose,
onSuccess,
}: {
open: boolean;
onClose: () => void;
onSuccess: (status: string) => void;
}) {
const [data, setData] = useState({ username: "", password: "" });
const [sending, setSending] = useState(false);
const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);

if (!open) return null;

const handle = (e: React.FormEvent) => {
e.preventDefault();
setSending(true);
setError("");
fetch("/api/login-cliente", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data),
})
.then(async function (res) {
const json = await res.json();
if (!res.ok) {
setError(json.error || "Usuario ou senha incorretos");
return;
}
onSuccess(json.status);
onClose();
})
.catch(function () {
setError("Erro ao efetuar login");
})
.finally(function () {
setSending(false);
});
};

return (
<div
onClick={onClose}
style={{
position: "fixed",
inset: 0,
background: "rgba(0,0,0,0.7)",
zIndex: 10000,
display: "flex",
alignItems: "center",
justifyContent: "center",
padding: "1rem",
}}
>
<form
autoComplete="off"
onSubmit={handle}
onClick={(e) => e.stopPropagation()}
style={{
background: "white",
borderRadius: "2px",
padding: "2rem",
width: "100%",
maxWidth: "380px",
borderTop: "3px solid #C9A96E",
}}
>
<h3
style={{
fontFamily: "'Playfair Display', serif",
fontSize: "1.35rem",
fontWeight: 700,
color: "#1A1A1A",
marginBottom: "0.4rem",
}}
>
Entrar na minha conta
</h3>
<p
style={{
fontFamily: "'Lato', sans-serif",
fontSize: "0.85rem",
color: "#666",
marginBottom: "1.25rem",
lineHeight: 1.6,
}}
>
Use o usuario e senha criados no cadastro.
</p>
<div style={{ marginBottom: "0.9rem" }}>
<input
type="text"
required
placeholder="Usuario"
autoComplete="off"
value={data.username}
onChange={(e) => setData({ ...data, username: e.target.value })}
style={{
width: "100%",
padding: "0.6rem 0.85rem",
border: "1px solid #d4c4a8",
borderRadius: "2px",
fontFamily: "'Lato', sans-serif",
fontSize: "0.9rem",
color: "#1A1A1A",
background: "white",
outline: "none",
}}
/>
</div>
<div style={{ marginBottom: "0.9rem", position: "relative" }}>
<input
type={showPassword ? "text" : "password"}
required
placeholder="Senha"
autoComplete="new-password"
value={data.password}
onChange={(e) => setData({ ...data, password: e.target.value })}
style={{
width: "100%",
padding: "0.6rem 2.4rem 0.6rem 0.85rem",
border: "1px solid #d4c4a8",
borderRadius: "2px",
fontFamily: "'Lato', sans-serif",
fontSize: "0.9rem",
color: "#1A1A1A",
background: "white",
outline: "none",
}}
/>
<span
onClick={function () { setShowPassword(!showPassword); }}
title={showPassword ? "Ocultar senha" : "Mostrar senha"}
style={{
position: "absolute",
right: "0.7rem",
top: "50%",
transform: "translateY(-50%)",
cursor: "pointer",
fontSize: "1.1rem",
lineHeight: 1,
opacity: showPassword ? 1 : 0.5,
userSelect: "none",
}}
>
{"\u{1F441}"}
</span>
</div>
{error ? (
<p style={{ color: "#b00020", fontSize: "0.8rem", marginBottom: "0.9rem" }}>{error}</p>
) : null}
<button type="submit" className="btn-gold w-full text-center" disabled={sending} style={{ cursor: "pointer" }}>
{sending ? "Entrando..." : "Entrar"}
</button>
<button
type="button"
onClick={onClose}
style={{
display: "block",
width: "100%",
textAlign: "center",
marginTop: "0.8rem",
background: "none",
border: "none",
cursor: "pointer",
fontFamily: "'Lato', sans-serif",
fontSize: "0.8rem",
color: "#999",
textDecoration: "underline",
}}
>
Agora nao
</button>
<a
href={`https://wa.me/5551997399494?text=${encodeURIComponent("Ola! Esqueci minha senha de acesso ao catalogo" + (data.username ? " (usuario: " + data.username + ")" : "") + ". Podem me ajudar a redefinir?")}`}
target="_blank"
rel="noopener noreferrer"
style={{
display: "block",
width: "100%",
textAlign: "center",
marginTop: "0.6rem",
fontFamily: "'Lato', sans-serif",
fontSize: "0.8rem",
color: "#999",
textDecoration: "underline",
}}
>
Esqueceu a senha?
</a>
</form>
</div>
);
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
    const [activeTab, setActiveTab] = useState("Todos");
      const [unlocked, setUnlocked] = useState(false);
        const [gateOpen, setGateOpen] = useState(false);
          const [leadStatus, setLeadStatus] = useState("none");
const [loginOpen, setLoginOpen] = useState(false);
const [heroSlides, setHeroSlides] = useState(DEFAULT_HERO_SLIDES);
useEffect(() => {
fetch("/api/products?resource=carousel")
.then((res) => res.json())
.then((json) => {
if (json.slides && json.slides.length > 0) {
setHeroSlides(json.slides.map((s) => ({ img: s.image_url, title: s.title, subtitle: s.subtitle, cta: s.cta })));
}
})
.catch(() => {});
}, []);
useEffect(() => {
if (sessionStorage.getItem("guindani_client_active") !== "1") { return; }
fetch("/api/lead-status")
.then((res) => res.json())
.then((json) => {
setLeadStatus(json.status);
if (json.status === "approved") setUnlocked(true);
})
.catch(() => {});
}, []);


useFadeInSections();

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Header
        onCatalog={() => {
          if (!unlocked) setGateOpen(true);
          document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" });
        }}
loggedIn={leadStatus !== "none"}
onLoginClick={() => {
if (leadStatus !== "none") {
fetch("/api/logout-cliente", { method: "POST" }).finally(function () {
sessionStorage.removeItem("guindani_client_active");
setLeadStatus("none");
setUnlocked(false);
});
} else {
setLoginOpen(true);
}
}}
      />
      <main>
        <HeroSlider heroSlides={heroSlides} />
        <CategoriesSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unlocked={unlocked}
          pending={leadStatus === "pending"}
          onGate={() => setGateOpen(true)}
        />
        <AboutSection />
        <ContactSection />
      </main>
      <CatalogGateModal
        open={gateOpen}
        onClose={() => setGateOpen(false)}
          onUnlock={() => { sessionStorage.setItem("guindani_client_active", "1"); setLeadStatus("pending"); }}      
          />
<ClientLoginModal
open={loginOpen}
onClose={() => setLoginOpen(false)}
onSuccess={(status) => {
sessionStorage.setItem("guindani_client_active", "1");
setLeadStatus(status);
if (status === "approved") setUnlocked(true);
}}
/>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
