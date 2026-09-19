import React, { useEffect, useRef } from 'react';
import { ASSET_IMAGES } from '../data/cleaningData';

interface CyberBackgroundProps {
  children: React.ReactNode;
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle digital rain / mist particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Drops array
    const drops: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];
    const dropCount = 65;

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render rain drops with slight pink/cyan tint
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        const grad = ctx.createLinearGradient(d.x, d.y, d.x - 2, d.y + d.length);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(1, `rgba(255, 45, 141, ${d.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.5;

        if (d.y > height) {
          d.y = -20;
          d.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#05060b] overflow-x-hidden flex flex-col items-center justify-between">
      {/* Background Image: Rain-slicked cyberpunk street at night with Reblix & A&R emblems */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-top bg-no-repeat pointer-events-none transition-all duration-700 filter brightness-[0.75] contrast-[110%]"
        style={{ backgroundImage: `url(${ASSET_IMAGES.bgImage})` }}
      />

      {/* Cyberpunk Vignette & Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#05060bcc] via-[#070912ee] to-[#040509] pointer-events-none" />

      {/* Spielerische Streifen: Playful Cyber Neon Stripes & Light Beams */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        {/* Repeating diagonal cyber stripes */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,transparent,transparent_36px,rgba(0,240,255,0.06)_36px,rgba(0,240,255,0.06)_38px,transparent_38px,transparent_76px,rgba(255,45,141,0.05)_76px,rgba(255,45,141,0.05)_78px)]" />
        
        {/* Playful glowing horizontal laser streak 1 (Cyan) */}
        <div className="absolute top-[28%] -left-[10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -rotate-6 shadow-[0_0_15px_#00f0ff] animate-pulse" />
        
        {/* Playful glowing laser streak 2 (Neon Pink) */}
        <div className="absolute top-[52%] -left-[10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent rotate-3 shadow-[0_0_15px_#ff2d8d]" />
        
        {/* Playful glowing laser streak 3 (Cyan/Magenta Accent) */}
        <div className="absolute top-[75%] -left-[10%] w-[120%] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 via-pink-500/30 to-transparent -rotate-2" />

        {/* Ambient colored light pools */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-pink-500/15 via-cyan-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-pink-500/10 blur-3xl rounded-full" />
      </div>

      {/* Atmospheric Neon Signs on distant building facades */}
      {/* LEFT NEON SIGN: サケチキX */}
      <div className="hidden xl:flex fixed left-4 top-24 z-10 flex-col items-center select-none pointer-events-none">
        <div className="w-1 h-12 bg-slate-700/60" />
        <div className="border border-pink-500/40 bg-black/75 px-2 py-4 rounded-sm backdrop-blur-md shadow-[0_0_20px_rgba(255,45,141,0.5)] flex flex-col items-center gap-2 animate-pulse">
          <span className="text-[10px] tracking-widest text-cyan-400 font-mono-cyber">DISTRICT 07</span>
          <div className="flex flex-col text-2xl font-bold tracking-widest text-pink-500 [writing-mode:vertical-rl] drop-shadow-[0_0_12px_#ff2d8d]">
            サケチキＸ
          </div>
          <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ff2d8d]" />
          <span className="text-[9px] text-pink-300/70 font-mono-cyber">NEON-STREET</span>
        </div>
        <div className="w-0.5 h-20 bg-gradient-to-b from-pink-500/30 to-transparent" />
      </div>

      {/* RIGHT NEON SIGN: 中支版 */}
      <div className="hidden xl:flex fixed right-4 top-28 z-10 flex-col items-center select-none pointer-events-none">
        <div className="w-1 h-16 bg-slate-700/60" />
        <div className="border border-cyan-500/40 bg-black/75 px-2 py-4 rounded-sm backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.4)] flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-pink-400 font-mono-cyber">CYBER FACILITY</span>
          <div className="flex flex-col text-2xl font-bold tracking-widest text-cyan-400 [writing-mode:vertical-rl] drop-shadow-[0_0_12px_#00f0ff] animate-neon-pulse">
            中支版
          </div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
          <span className="text-[9px] text-cyan-300/70 font-mono-cyber">TOKYO-SYS</span>
        </div>
        <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-500/30 to-transparent" />
      </div>

      {/* Subtle Rain Drops Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none opacity-60"
      />

      {/* Subtle Scanlines */}
      <div className="fixed inset-0 z-10 scanlines pointer-events-none opacity-30" />

      {/* Main Container */}
      <div className="relative z-20 w-full flex flex-col items-center justify-start min-h-screen py-4 md:py-8 px-2 sm:px-4 lg:px-6">
        {children}
      </div>

      {/* Dark wet reflective surface in foreground mirroring the lights */}
      <div className="relative z-20 w-full mt-4 pointer-events-none select-none">
        <div className="h-14 md:h-20 w-full bg-gradient-to-b from-transparent via-slate-950/70 to-[#030407] relative overflow-hidden">
          {/* Reflective Neon Light Puddles */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500/40 via-cyan-500/20 to-transparent blur-md" />
          <div className="absolute bottom-1 left-1/4 w-1/2 h-4 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1 right-1/4 w-1/3 h-4 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};
