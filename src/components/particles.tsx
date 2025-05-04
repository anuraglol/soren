"use client";

import { useEffect, useRef } from "react";

export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const stars: { x: number; y: number; radius: number; speed: number }[] = [];
    const numStars = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4, // restrict to upper 40%
          radius: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply fade mask gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.2, "white");
      gradient.addColorStop(0.8, "white");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);

      ctx.save();
      ctx.globalCompositeOperation = "source-in";

      for (let star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height * 0.4) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    createStars();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createStars();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
  );
};
