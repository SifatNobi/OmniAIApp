"use client";

import { useEffect, useRef } from "react";

export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      const hue1 = 220 + Math.sin(time * 0.5) * 20;
      const hue2 = 240 + Math.cos(time * 0.7) * 15;

      gradient.addColorStop(0, `hsla(${hue1}, 80%, 50%, 0.03)`);
      gradient.addColorStop(0.3, `hsla(${hue2}, 70%, 40%, 0.04)`);
      gradient.addColorStop(0.6, `hsla(${hue1 + 10}, 60%, 30%, 0.02)`);
      gradient.addColorStop(1, `hsla(${hue2 + 20}, 50%, 20%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing aurora bands
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const offset = i * 0.3;
        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            canvas.height * 0.3 +
            Math.sin(x * 0.003 + time * 2 + offset) * 50 +
            Math.sin(x * 0.007 + time * 1.5 + offset * 2) * 30 +
            Math.sin(x * 0.001 + time * 0.5 + offset * 3) * 80;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `hsla(${hue1 + i * 15}, 70%, 60%, ${0.08 - i * 0.02})`;
        ctx.lineWidth = 60 - i * 15;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
