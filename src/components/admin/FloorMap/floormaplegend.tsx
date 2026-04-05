const legend = [
  { label: "Active Incident", color: "bg-critical" },
  { label: "Staff Dispatched", color: "bg-moderate" },
  { label: "Recently Cleared", color: "bg-resolved" },
  { label: "Normal", color: "bg-text-faint" },
];

const FloorMapLegend = () => (
  <div className="flex items-center gap-6">
    {legend.map(({ label, color }) => (
      <div key={label} className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-t-[2px] rounded-b-[2px] shrink-0 ${color}`}
        />
        <span className="font-mono text-[12px] text-text-secondary">
          {label}
        </span>
      </div>
    ))}
  </div>
);

export default FloorMapLegend;
