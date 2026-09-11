"use client";

import { useEffect, useRef, useState } from "react";

type Props = { file: File; onCrop: (file: File) => void };

export default function ImageCropper({ file, onCrop }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [src, setSrc] = useState("");
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!src || !canvasRef.current) return;
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current!;
      const width = 1200;
      const height = 500;
      canvas.width = width;
      canvas.height = height;
      const scale = Math.max(width / image.width, height / image.height) * zoom;
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const left = (width - drawWidth) * (x / 100);
      const top = (height - drawHeight) * (y / 100);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.fillStyle = "#f4e7d9";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, left, top, drawWidth, drawHeight);
    };
    image.src = src;
  }, [src, zoom, x, y]);

  function confirmCrop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) onCrop(new File([blob], `portada-inicio-${Date.now()}.jpg`, { type: "image/jpeg" }));
    }, "image/jpeg", 0.9);
  }

  return <div className="mt-4 rounded-2xl border border-[#eadbca] bg-[#fffaf5] p-4"><p className="text-sm font-black text-[#6f1519]">Recorta la portada como en Facebook o WhatsApp</p><p className="mt-1 text-xs text-[#75685f]">Ajusta el zoom y mueve el encuadre hasta mostrar la parte exacta que quieres.</p><canvas ref={canvasRef} className="mt-4 aspect-[12/5] w-full rounded-xl object-cover"/><div className="mt-4 grid gap-3 sm:grid-cols-3"><label className="text-xs font-bold text-[#75685f]">Zoom<input aria-label="Zoom" type="range" min="1" max="3" step="0.05" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="mt-2 w-full accent-[#891C20]"/></label><label className="text-xs font-bold text-[#75685f]">Horizontal<input aria-label="Posición horizontal" type="range" min="0" max="100" value={x} onChange={(e) => setX(Number(e.target.value))} className="mt-2 w-full accent-[#891C20]"/></label><label className="text-xs font-bold text-[#75685f]">Vertical<input aria-label="Posición vertical" type="range" min="0" max="100" value={y} onChange={(e) => setY(Number(e.target.value))} className="mt-2 w-full accent-[#891C20]"/></label></div><button type="button" onClick={confirmCrop} className="mt-4 w-full rounded-full bg-[#891C20] px-5 py-3 text-sm font-bold text-white">Usar este recorte</button></div>;
}
