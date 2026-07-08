/**
 * Guindani — Home Page
 * Design: Guindani Classique (inspirado no songa.it)
 * Paleta: Dourado Champagne #C9A96E | Preto #1A1A1A | Branco #FFFFFF
 * Tipografia: Playfair Display (títulos) + Lato (corpo)
 */

import { useEffect, useRef, useState } from "react";

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const LOGO_URL =
  "/manus-storage/LOGOGUINDANIFUNDOBRANCO_5cf9cbef.jpeg";
const CATEGORIES = [
  {
    id: "aneis",
    label: "Anéis",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663787846659/aeFGMeyncKnfvU6NJgH559/category_aneis-g6qDG8EcPAudu7dNYXPBZ7.webp",
  },
  {
    id: "colares",
    label: "Colares",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663787846659/aeFGMeyncKnfvU6NJgH559/category_colares-VW5iJZU9KWjfKrAJZMcrUr.webp",
  },
  {
    id: "pulseiras",
    label: "Pulseiras",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663787846659/aeFGMeyncKnfvU6NJgH559/category_pulseiras-VAHf9tRtpihZBw8sSgQp3L.webp",
  },
  {
    id: "diamantes",
    label: "Diamantes",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663787846659/aeFGMeyncKnfvU6NJgH559/category_diamantes-X9eM8UHAZKjc3e7NSRnM4P.webp",
  },
  {
    id: "aliancas",
    label: "Alianças",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663787846659/aeFGMeyncKnfvU6NJgH559/category_aliancas-4kyDHNgN3dgy7EjqvarzUs.webp",
  },
  {
    id: "brincos",
    label: "Brincos",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663787846659/aeFGMeyncKnfvU6NJgH559/category_brincos-hHMESMkfUbZ4HtvSKR52vy.webp",
  },
];

const HERO_SLIDES = [
  {
    img: "/images/hero-1.jpg",
    title: "Elegância em Cada Detalhe",
    subtitle: "Conjuntos exclusivos que valorizam sua beleza",
    cta: "Ver coleção",
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

const TABS = ["Todos", "Anéis", "Colares", "Pulseiras", "Brincos", "Alianças"];

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
  return (
    <div className="topbar" />
  );
}

function Header({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (t: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Categorias", href: "#categorias" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        background: "white",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.10)" : "0 1px 0 #e8dcc8",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={LOGO_URL}
              alt="Guindani"
              className="w-16 h-16 object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA (desktop) */}
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as joias."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 btn-gold"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className="block h-0.5 bg-gray-800 transition-all duration-300"
                style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
              />
              <span
                className="block h-0.5 bg-gray-800 transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 bg-gray-800 transition-all duration-300"
                style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? "400px" : "0" }}
        >
          <nav className="flex flex-col py-4 gap-4 border-t border-gray-100">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-center mt-2"
            >
              Fale no WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
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
    <section className="relative w-full overflow-hidden" style={{ height: "640px" }}>
      {/* Sliding track — each slide keeps its own image and transitions to the right */}
      <div
        className="absolute inset-0 flex h-full"
        style={{
          width: `${HERO_SLIDES.length * 100}%`,
          transform: `translateX(-${current * (100 / HERO_SLIDES.length)}%)`,
          transition: "transform 1.1s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="relative h-full overflow-hidden"
            style={{ width: `${100 / HERO_SLIDES.length}%` }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center 22%",
                filter: "brightness(0.72) saturate(1.05)",
                transform: i === current ? "scale(1.08)" : "scale(1)",
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
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
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
                      fontSize: "1.05rem",
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
        {HERO_SLIDES.map((_, i) => (
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
}: {
  activeTab: string;
  onTabChange: (t: string) => void;
}) {
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
              style={{ aspectRatio: "4/3", borderRadius: "2px" }}
            >
              <img src={cat.img} alt={cat.label} />
              <div className="overlay" />
              <div className="label">{cat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contato" className="btn-dark">
            Ver Toda a Coleção
          </a>
        </div>
      </div>
    </section>
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
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Tradição e Excelência em Joalheria
            </h2>
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
              A Guindani nasceu da paixão por criar peças que contam histórias. Cada joia é cuidadosamente selecionada e trabalhada por artesãos especializados, garantindo qualidade e beleza incomparáveis.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Trabalhamos com ouro 18k, prata 925 e diamantes certificados, oferecendo peças únicas para os momentos mais especiais da sua vida.
            </p>
            <a href="#contato" className="btn-gold">
              Saiba Mais
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "+500", label: "Peças Exclusivas" },
              { number: "18K", label: "Ouro Certificado" },
              { number: "100%", label: "Garantia de Qualidade" },
              { number: "+10", label: "Anos de Experiência" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6"
                style={{
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#C9A96E",
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
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
    const msg = encodeURIComponent(
      `Olá! Me chamo ${form.name}.\n\n${form.message}\n\nEmail: ${form.email}`
    );
    window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
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
                  value: "Rua das Joias, 100 — São Paulo, SP",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  label: "Telefone / WhatsApp",
                  value: "(11) 99999-9999",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: "E-mail",
                  value: "contato@lumierejoias.com.br",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: "Horário",
                  value: "Seg a Sex: 9h às 18h | Sáb: 9h às 13h",
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
      links: ["Anéis", "Colares", "Pulseiras", "Brincos", "Alianças", "Diamantes"],
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
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
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
      href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as joias da Guindani."
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("Todos");
  useFadeInSections();

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        <HeroSlider />
        <CategoriesSection activeTab={activeTab} onTabChange={setActiveTab} />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
