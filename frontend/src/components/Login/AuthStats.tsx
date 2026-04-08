interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "1.2s", label: "AI Latency" },
  { value: "98.4%", label: "Accuracy" },
  { value: "3", label: "Role Layers" },
];

const AuthStats = () => (
  <div className="grid grid-cols-3 gap-3">
    {stats.map(({ value, label }) => (
      <div
        key={label}
        className="bg-surface border border-border rounded-xl px-5 py-4 relative overflow-hidden "
      >
        {/* top red accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-critical opacity-50" />

        <div className="font-mono text-2xl font-semibold text-critical tracking-tight leading-none mb-2">
          {value}
        </div>
        <div className="font-mono text-[10px] text-text-faint uppercase tracking-widest">
          {label}
        </div>
      </div>
    ))}
  </div>
);

export default AuthStats;
