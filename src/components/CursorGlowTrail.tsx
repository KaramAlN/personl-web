import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export const CursorGlowTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion } = useLanguage();
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);

  useEffect(() => {
    // Check if device is fine pointer (mouse, trackpad) vs touch
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsTouchDevice(!hasFinePointer);
    if (!hasFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const colors = ['#22D3EE', '#38BDF8', '#818CF8', '#A5F3FC'];

    let cursor = { x: -100, y: -100, lastX: -100, lastY: -100, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      cursor.active = true;
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      // Spawn trail particles based on movement
      const dist = Math.hypot(cursor.x - cursor.lastX, cursor.y - cursor.lastY);
      if (dist > 3 && particles.length < 50) {
        for (let i = 0; i < Math.min(2, Math.floor(dist / 6) + 1); i++) {
          particles.push({
            x: cursor.x + (Math.random() - 0.5) * 6,
            y: cursor.y + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 2.8 + 1.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.9,
            life: 1,
          });
        }
        cursor.lastX = cursor.x;
        cursor.lastY = cursor.y;
      }
    };

    const handleMouseLeave = () => {
      cursor.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (reducedMotion) return;

      // Draw faint cursor halo
      if (cursor.active && cursor.x > 0 && cursor.y > 0) {
        const gradient = ctx.createRadialGradient(
          cursor.x,
          cursor.y,
          0,
          cursor.x,
          cursor.y,
          45
        );
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
        gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
        gradient.addColorStop(1, 'rgba(7, 11, 31, 0)');

        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 45, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Update & Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        p.alpha = Math.max(0, p.life * 0.9);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      id="cursor-particle-trail"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[2]"
    />
  );
};
