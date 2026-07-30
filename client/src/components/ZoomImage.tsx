import { useEffect, useState } from "react";

interface ZoomImageProps {
  src: string;
  alt: string;
  zoomScale?: number;
  containerStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

export default function ZoomImage(props: ZoomImageProps) {
  const { src, alt, zoomScale = 2, containerStyle, imgStyle } = props;
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: x, y: y });
  }

  useEffect(function () {
    if (!lightboxOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <>
      <div
        onMouseEnter={function () { setZoomActive(true); }}
        onMouseLeave={function () { setZoomActive(false); }}
        onMouseMove={handleMouseMove}
        onClick={function () { setLightboxOpen(true); }}
        style={{
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: "2px",
          background: "#F5F0E8",
          cursor: "zoom-in",
          position: "relative",
          ...containerStyle,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: zoomActive ? "scale(" + zoomScale + ")" : "scale(1)",
            transformOrigin: zoomPos.x + "% " + zoomPos.y + "%",
            transition: zoomActive ? "none" : "transform 0.25s ease-out",
            ...imgStyle,
          }}
        />
      </div>
      {lightboxOpen && (
        <div
          onClick={function () { setLightboxOpen(false); }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(20, 18, 15, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "2rem",
          }}
        >
          <button
            onClick={function (e) { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Fechar"
            style={{
              position: "fixed",
              top: "1.5rem",
              right: "1.5rem",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.95)",
              color: "#1A1A1A",
              fontSize: "1.6rem",
              lineHeight: "1",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            onClick={function (e) { e.stopPropagation(); }}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "4px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </>
  );
}
