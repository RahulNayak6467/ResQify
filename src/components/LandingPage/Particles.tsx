import { useMemo } from "react";

const Particles = () => {
  // generate once, never changes on re-render
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0–100%
      delay: Math.random() * 5, // 0–5s animation delay
      duration: 4 + Math.random() * 4, // 4–8s
      size: 2 + Math.random() * 3, // 2–5px
    }));
  }, []); // empty deps = runs once on mount

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-resolved  animate-moveToTop"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
