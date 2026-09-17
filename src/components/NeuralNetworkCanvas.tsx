import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  phase: number;
  color: string;
}

interface Pulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export const NeuralNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 35 : 75;
    const maxDistance = isMobile ? 120 : 160;

    const colors = ['#22D3EE', '#38BDF8', '#818CF8', '#C084FC'];

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseRadius: Math.random() * 2 + 1.5,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const pulses: Pulse[] = [];
    const maxPulses = isMobile ? 6 : 14;

    // Track mouse coordinates
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
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

      if (reducedMotion) {
        // Static clean neural representation
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = a.color;
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - dist / maxDistance)})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
        return;
      }

      // 1. Update Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.phase += 0.025;

        // Wall rebound
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse interaction: slight gravitational displacement & repulsion
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseThreshold = 180;

          if (dist < mouseThreshold && dist > 1) {
            const force = (1 - dist / mouseThreshold) * 1.5;
            // Push gently away then stabilize
            node.x -= (dx / dist) * force;
            node.y -= (dy / dist) * force;
          }
        }
      }

      // 2. Draw Synaptic Connections & Spawn Pulses
      const connectedPairs: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connectedPairs.push([i, j]);
            const alpha = (1 - dist / maxDistance) * 0.28;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Randomly spawn pulses on existing connections
      if (connectedPairs.length > 0 && pulses.length < maxPulses && Math.random() < 0.06) {
        const randomPair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        pulses.push({
          sourceIdx: randomPair[0],
          targetIdx: randomPair[1],
          progress: 0,
          speed: Math.random() * 0.015 + 0.01,
          color: Math.random() > 0.4 ? '#22D3EE' : '#818CF8',
        });
      }

      // 3. Update & Draw Synaptic Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const a = nodes[pulse.sourceIdx];
        const b = nodes[pulse.targetIdx];

        if (!a || !b) {
          pulses.splice(p, 1);
          continue;
        }

        const px = a.x + (b.x - a.x) * pulse.progress;
        const py = a.y + (b.y - a.y) * pulse.progress;

        // Draw glowing electrical pulse
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 4. Draw Nodes with subtle pulsing radius
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const currentRadius = node.baseRadius + Math.sin(node.phase) * 0.7;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
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

  return (
    <canvas
      ref={canvasRef}
      id="neural-network-layer"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
    />
  );
};
