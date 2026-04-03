type BarColor = "resolved" | "moderate";

interface PerformanceRow {
  label: string;
  bar?: { value: number; color: BarColor };
  val?: string;
  valColor?: string;
}

const barColorMap: Record<BarColor, string> = {
  resolved: "bg-resolved",
  moderate: "bg-moderate",
};

const valColorMap: Record<string, string> = {
  resolved: "text-resolved",
  moderate: "text-moderate",
  accent: "text-accent",
  default: "text-text-primary",
};

const rows: PerformanceRow[] = [
  {
    label: "Medical accuracy",
    bar: { value: 98, color: "resolved" },
    val: "98%",
    valColor: "resolved",
  },
  {
    label: "Fire accuracy",
    bar: { value: 96, color: "resolved" },
    val: "96%",
    valColor: "resolved",
  },
  {
    label: "Security accuracy",
    bar: { value: 91, color: "moderate" },
    val: "91%",
    valColor: "moderate",
  },
  {
    label: "Maintenance acc.",
    bar: { value: 99, color: "resolved" },
    val: "99%",
    valColor: "resolved",
  },
  { label: "Total API calls", val: "147", valColor: "default" },
  { label: "Avg latency", val: "1.2s", valColor: "resolved" },
  { label: "Token usage", val: "18,420", valColor: "default" },
  { label: "Model", val: "claude-haiku", valColor: "accent" },
];

const AIPerformanceCard = () => (
  <div className="bg-surface border border-border rounded-lg p-5">
    <p className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest mb-5">
      AI Performance Today
    </p>

    <div className="flex flex-col">
      {rows.map(({ label, bar, val, valColor }, i) => (
        <div
          key={label}
          className={`flex items-center justify-between py-3 ${i !== rows.length - 1 ? "border-b border-border" : ""}`}
        >
          <span className="font-mono text-sm text-text-secondary">{label}</span>

          <div className="flex items-center gap-3">
            {bar && (
              <div className="w-24 h-1 bg-surface-raised rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColorMap[bar.color]}`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            )}
            <span
              className={`font-mono text-sm font-semibold ${valColorMap[valColor ?? "default"]}`}
            >
              {val}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AIPerformanceCard;
