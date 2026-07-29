import { useState } from "react";
import React from "react";

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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({ x: x, y: y });
  }

  return React.createElement(
        "div",
    {
            onMouseEnter: function () { setZoomActive(true); },
            onMouseLeave: function () { setZoomActive(false); },
            onMouseMove: handleMouseMove,
            style: {
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      borderRadius: "2px",
                      background: "#F5F0E8",
                      cursor: "zoom-in",
                      position: "relative",
                      ...containerStyle,
            },
    },
        React.createElement("img", {
                src: src,
                alt: alt,
                style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transform: zoomActive ? "scale(" + zoomScale + ")" : "scale(1)",
                          transformOrigin: zoomPos.x + "% " + zoomPos.y + "%",
                          transition: zoomActive ? "none" : "transform 0.25s ease-out",
                          ...imgStyle,
                },
        })
      );
}
