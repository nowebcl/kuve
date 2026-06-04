"use client";

import { useEffect, useRef } from "react";

export default function PerspectiveGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      time += 0.4;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.classList.contains("light");
      
      // Determine line styles based on theme
      const gridColor = isLight ? "rgba(30, 41, 59, 0.03)" : "rgba(255, 255, 255, 0.02)";
      const accentColor = isLight ? "rgba(168, 85, 247, 0.08)" : "rgba(168, 85, 247, 0.09)";
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height * 0.45; // Horizon height
      
      const focalLength = height * 0.65;
      const yOffset = height * 0.35; // Grid plane vertical position

      // Project a 3D coordinate to 2D screen coordinates with waves (no mouse distortion)
      const project = (x3d: number, z3d: number) => {
        // Wave math: sine wave along Z axis, modulated by X for natural flag/mesh waving
        const wave = Math.sin(z3d * 0.007 - time * 0.03) * 18 * Math.cos(x3d * 0.003);
        const y3d = yOffset + wave;

        const scale = focalLength / (z3d + 100);
        const screenX = centerX + x3d * scale;
        const screenY = centerY + y3d * scale;

        return { x: screenX, y: screenY };
      };

      ctx.lineWidth = 1;

      // Draw Z-receding Grid lines (running front-to-back)
      const xRange = 1200;
      const xStep = 80;
      const zMin = 10;
      const zMax = 900;
      const zStep = 10;

      for (let x = -xRange; x <= xRange; x += xStep) {
        ctx.beginPath();
        const isAccent = Math.abs(x) % (xStep * 3) === 0;
        ctx.strokeStyle = isAccent ? accentColor : gridColor;

        let first = true;
        for (let z = zMin; z <= zMax; z += zStep) {
          const pt = project(x, z);
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // Draw X-horizontal Grid lines (running left-to-right)
      const xStepInner = 10;
      
      for (let z = zMin; z <= zMax; z += 50) {
        ctx.beginPath();
        ctx.strokeStyle = z % 150 === 0 ? accentColor : gridColor;

        let first = true;
        for (let x = -xRange; x <= xRange; x += xStepInner) {
          const pt = project(x, z);
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}
