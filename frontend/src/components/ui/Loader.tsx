import { useState, useEffect } from "react";

/*
  Usage:

  <Loader />
  <Loader variant="pulse" size="lg" />
  <Loader variant="bars" text="Saving changes" />
  <Loader variant="orbital" text="Fetching alerts" message="This may take a moment" />
  <Loader fullscreen text="Loading dashboard" message="Preparing your workspace" />
  <Loader fullscreen bg="mesh" text="Syncing data" message="Connecting to server" />
  <Loader fullscreen bg="transparent" text="Processing" />
  <Loader inline size="sm" text="Syncing" />
*/

const SIZES = { sm: 24, md: 40, lg: 64 };

const css = `
  /* === OVERLAY === */
  .stl-overlay {
    position: fixed; inset: 0; z-index: 9990;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    animation: stlFadeIn 0.3s ease;
  }
  .stl-overlay.bg-solid {
    background: #080a10;
  }
  .stl-overlay.bg-transparent {
    background: rgba(8,10,16,0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .stl-overlay.bg-mesh {
    background: #080a10;
    overflow: hidden;
  }

  /* === MESH BG === */
  .stl-mesh { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .stl-mesh-orb {
    position: absolute; border-radius: 50%;
    filter: blur(120px); opacity: 0.2;
    animation: stlOrbDrift 20s ease-in-out infinite;
  }
  .stl-mesh-orb:nth-child(1) {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #00e5a0, transparent 70%);
    top: -10%; left: -5%;
  }
  .stl-mesh-orb:nth-child(2) {
    width: 350px; height: 350px;
    background: radial-gradient(circle, #00b4ff, transparent 70%);
    bottom: -10%; right: -5%;
    animation-delay: -7s; animation-duration: 25s;
  }
  .stl-mesh-orb:nth-child(3) {
    width: 250px; height: 250px;
    background: radial-gradient(circle, #ff4d6a, transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    opacity: 0.08; animation-delay: -12s; animation-duration: 30s;
  }
  .stl-mesh-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 70%);
  }
  @keyframes stlOrbDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(30px,-20px) scale(1.05); }
    66% { transform: translate(-20px,15px) scale(0.95); }
  }

  /* === WRAPPER === */
  .stl-wrap {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 1rem;
    position: relative; z-index: 1;
  }
  .stl-wrap.inline {
    flex-direction: row; gap: 0.5rem;
  }
  .stl-wrap.inline .stl-message { display: none; }

  /* === SPINNER === */
  .stl-spinner {
    position: relative; display: flex;
    align-items: center; justify-content: center;
  }
  .stl-ring {
    position: absolute; inset: 0;
    border: 2px solid rgba(255,255,255,0.04);
    border-top-color: #00e5a0;
    border-radius: 50%;
    animation: stlSpin 0.9s cubic-bezier(0.5,0,0.5,1) infinite;
  }
  .stl-ring-inner {
    position: absolute;
    border: 2px solid transparent;
    border-bottom-color: rgba(0,229,160,0.3);
    border-radius: 50%;
    animation: stlSpin 1.4s cubic-bezier(0.5,0,0.5,1) infinite reverse;
  }
  .stl-core {
    width: 20%; height: 20%;
    background: #00e5a0;
    border-radius: 50%;
    box-shadow: 0 0 10px #00e5a0, 0 0 20px rgba(0,229,160,0.25);
    animation: stlCorePulse 1.5s ease-in-out infinite;
  }

  /* === PULSE === */
  .stl-pulse-wrap {
    position: relative; display: flex;
    align-items: center; justify-content: center;
  }
  .stl-pulse-dot {
    border-radius: 50%; background: #00e5a0;
    box-shadow: 0 0 10px #00e5a0;
    animation: stlCorePulse 1.2s ease-in-out infinite;
  }
  .stl-pulse-ring {
    position: absolute; inset: -40%;
    border: 2px solid rgba(0,229,160,0.25);
    border-radius: 50%;
    animation: stlRingExpand 1.5s ease-out infinite;
  }
  .stl-pulse-ring:nth-child(2) { animation-delay: 0.5s; }

  /* === BARS === */
  .stl-bars { display: flex; align-items: flex-end; gap: 3px; }
  .stl-bar {
    border-radius: 2px; background: #00e5a0;
    animation: stlBarBounce 1s ease-in-out infinite;
  }
  .stl-bar:nth-child(1) { animation-delay: 0s; }
  .stl-bar:nth-child(2) { animation-delay: 0.1s; }
  .stl-bar:nth-child(3) { animation-delay: 0.2s; }
  .stl-bar:nth-child(4) { animation-delay: 0.3s; }
  .stl-bar:nth-child(5) { animation-delay: 0.4s; }

  /* === ORBITAL === */
  .stl-orbital {
    position: relative; display: flex;
    align-items: center; justify-content: center;
  }
  .stl-orbit-ring {
    position: absolute; inset: 0;
    border: 1.5px solid transparent; border-radius: 50%;
  }
  .stl-orbit-ring:nth-child(1) {
    border-top-color: #00e5a0;
    border-right-color: rgba(0,229,160,0.2);
    animation: stlSpin 1.2s linear infinite;
    filter: drop-shadow(0 0 4px #00e5a0);
  }
  .stl-orbit-ring:nth-child(2) {
    inset: 15%;
    border-bottom-color: #00b4ff;
    border-left-color: rgba(0,180,255,0.2);
    animation: stlSpin 1.8s linear infinite reverse;
    filter: drop-shadow(0 0 4px #00b4ff);
  }
  .stl-orbit-ring:nth-child(3) {
    inset: 30%;
    border-top-color: #ff4d6a;
    animation: stlSpin 2.4s linear infinite;
    filter: drop-shadow(0 0 3px #ff4d6a);
  }
  .stl-orbit-core {
    width: 18%; height: 18%;
    background: #00e5a0; border-radius: 50%;
    box-shadow: 0 0 12px #00e5a0, 0 0 24px rgba(0,229,160,0.3);
    animation: stlCorePulse 1.5s ease-in-out infinite;
  }

  /* === TEXT === */
  .stl-text {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
    font-size: 0.75rem;
    color: #8b949e;
    letter-spacing: 0.06em;
    text-align: center;
  }
  .stl-text-dots::after {
    content: '';
    animation: stlDots 1.5s steps(4,end) infinite;
  }

  /* === MESSAGE === */
  .stl-message {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    color: #5c6278;
    text-align: center;
    max-width: 280px;
    line-height: 1.5;
    animation: stlFadeIn 0.5s ease 0.3s both;
  }

  /* === KEYFRAMES === */
  @keyframes stlSpin { to { transform: rotate(360deg); } }
  @keyframes stlFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes stlCorePulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.7; }
  }
  @keyframes stlRingExpand {
    0% { transform: scale(0.5); opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  @keyframes stlBarBounce {
    0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
    50% { transform: scaleY(1); opacity: 1; }
  }
  @keyframes stlDots {
    0%  { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
  }
`;

function Spinner({ size }: { size: number }) {
  const inset = Math.round(size * 0.18);
  return (
    <div className="stl-spinner" style={{ width: size, height: size }}>
      <div className="stl-ring" />
      <div className="stl-ring-inner" style={{ inset }} />
      <div className="stl-core" />
    </div>
  );
}

function Pulse({ size }: { size: number }) {
  const d = size * 0.35;
  return (
    <div className="stl-pulse-wrap" style={{ width: size, height: size }}>
      <div className="stl-pulse-ring" />
      <div className="stl-pulse-ring" />
      <div className="stl-pulse-dot" style={{ width: d, height: d }} />
    </div>
  );
}

function Bars({ size }: { size: number }) {
  const w = Math.max(3, size * 0.1);
  return (
    <div className="stl-bars" style={{ height: size }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="stl-bar" style={{ width: w, height: size }} />
      ))}
    </div>
  );
}

function Orbital({ size }: { size: number }) {
  return (
    <div className="stl-orbital" style={{ width: size, height: size }}>
      <div className="stl-orbit-ring" />
      <div className="stl-orbit-ring" />
      <div className="stl-orbit-ring" />
      <div className="stl-orbit-core" />
    </div>
  );
}

function MeshBackground() {
  return (
    <div className="stl-mesh">
      <div className="stl-mesh-orb" />
      <div className="stl-mesh-orb" />
      <div className="stl-mesh-orb" />
      <div className="stl-mesh-grid" />
    </div>
  );
}

const VARIANTS = {
  spinner: Spinner,
  pulse: Pulse,
  bars: Bars,
  orbital: Orbital,
};

export default function Loader({
  variant = "spinner",
  size = "md",
  text = "",
  message = "",
  fullscreen = false,
  inline = false,
  bg = "solid",
}) {
  const [injected, setInjected] = useState(false);

  useEffect(() => {
    if (injected) return;
    if (!document.getElementById("stl-loader-css")) {
      const style = document.createElement("style");
      style.id = "stl-loader-css";
      style.textContent = css;
      document.head.appendChild(style);
    }
    setInjected(true);
  }, [injected]);

  const px = typeof size === "number" ? size : (SIZES as Record<string, number>)[size] ?? SIZES.md;
  const Component = ((VARIANTS as Record<string, unknown>)[variant] as typeof Spinner) ?? Spinner;

  const content = (
    <div className={`stl-wrap ${inline ? "inline" : ""}`}>
      <Component size={px} />
      {text && (
        <div className="stl-text">
          <span className="stl-text-dots">{text}</span>
        </div>
      )}
      {message && <div className="stl-message">{message}</div>}
    </div>
  );

  if (fullscreen) {
    return (
      <div className={`stl-overlay bg-${bg}`}>
        {bg === "mesh" && <MeshBackground />}
        {content}
      </div>
    );
  }

  return content;
}
