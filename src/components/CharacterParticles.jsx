import React, { useRef, useEffect } from "react";
import { useMousePosition } from "../utils/mouse";
import { cn } from "../utils/utils";

const characters = [
  "{",
  "}",
  "0",
  "1",
  ";",
  "@",
  "$",
  "=>",
  "//",
  "e",
  ":",
  "(",
  ")",
  "<>",
  "</>",
  "!",
  "#",
  "%",
  "^",
  "*",
  "~",
];
const colors = ["#39ff14", "#00ddeb", "#ff007a"];

export default function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  refresh = false,
}) {
  //quantity数量
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ctxRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const mousePos = useMousePosition();
  const sizeRef = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, []);

  useEffect(() => {
    updateMouse();
  }, [mousePos.x, mousePos.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const updateMouse = () => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = mousePos.x - rect.left - sizeRef.current.w / 2;
    const y = mousePos.y - rect.top - sizeRef.current.h / 2;
    const inside =
      x < sizeRef.current.w / 2 &&
      x > -sizeRef.current.w / 2 &&
      y < sizeRef.current.h / 2 &&
      y > -sizeRef.current.h / 2;
    if (inside) {
      mouse.current = { x, y };
    }
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !ctxRef.current) return;

    particles.current = [];
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    sizeRef.current = { w, h };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctxRef.current.setTransform(1, 0, 0, 1, 0, 0);
    ctxRef.current.scale(dpr, dpr);

    for (let i = 0; i < quantity; i++) {
      particles.current.push(createParticle());
    }
  };

  const createParticle = () => {
    const { w, h } = sizeRef.current;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      dx: 0,
      dy: Math.random() * 1 + 0.5, //垂直下落速度
      translateX: 0,
      translateY: 0,
      size: Math.random() * 9 + 12, //粒子大小
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.5 + 0.3).toFixed(1)),
      magnetism: 0.1 + Math.random() * 4,
      char: characters[Math.floor(Math.random() * characters.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  };

  const remap = (v, a, b, c, d) => {
    return Math.max(0, ((v - a) * (d - c)) / (b - a) + c);
  };

  const animate = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h);

    particles.current.forEach((p, i) => {
      const edges = [
        p.x + p.translateX,
        sizeRef.current.w - p.x - p.translateX,
        p.y + p.translateY,
        sizeRef.current.h - p.y - p.translateY,
      ];
      const closest = Math.min(...edges);
      const m = remap(closest, 0, 20, 0, 1);
      p.alpha =
        m > 1 ? Math.min(p.alpha + 0.02, p.targetAlpha) : p.targetAlpha * m;

      p.y += p.dy;
      p.translateX +=
        (mouse.current.x / (staticity / p.magnetism) - p.translateX) / ease;
      p.translateY +=
        (mouse.current.y / (staticity / p.magnetism) - p.translateY) / ease;

      if (p.y > sizeRef.current.h + p.size) {
        particles.current.splice(i, 1);
        particles.current.push(createParticle());
      } else {
        drawChar(ctx, p);
      }
    });

    requestAnimationFrame(animate);
  };

  const drawChar = (ctx, p) => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.font = `bold ${p.size}px monospace`;
    ctx.fillStyle = p.color;
    ctx.translate(p.translateX, p.translateY);
    ctx.fillText(p.char, p.x, p.y);
    ctx.restore();
  };

  return (
    <div
      ref={containerRef}
      className={cn(className, "fixed inset-0 pointer-events-none")}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
