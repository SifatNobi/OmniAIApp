"use client";

import { useEffect, useRef } from "react";

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const points: Point[] = [];
    const rows = 5;
    const cols = 7;

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        points.push({
          x: (c / cols) * window.innerWidth,
          y: (r / rows) * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    const resize = () => {
      points.forEach((p, i) => {
        const r = Math.floor(i / (cols + 1));
        const c = i % (cols + 1);
        p.x = (c / cols) * window.innerWidth;
        p.y = (r / rows) * window.innerHeight;
      });
    };

    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      points.forEach((p) => {
        p.x += Math.sin(time + p.y * 0.01) * 0.3;
        p.y += Math.cos(time + p.x * 0.01) * 0.3;
      });

      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * (cols + 1) + c;
          const p1 = points[idx];
          const p2 = points[idx + 1];
          const p3 = points[idx + cols + 1];
          const p4 = points[idx + cols + 2];

          const hue = 220 + Math.sin(time * 0.5 + c * 0.3 + r * 0.2) * 10;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();

          ctx.fillStyle = `hsla(${hue}, 70%, 30%, 0.015)`;
          ctx.fill();
        }
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
    />
  );
}
