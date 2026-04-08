import { legend } from "../../constants/legends";

const FloorMapLegend = () => (
  <div className="flex items-center gap-5 mt-3 ml-1">
    {legend.map(({ label, color }) => (
      <div key={label} className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-sm border ${color}`} />
        <span className="font-mono text-xs text-text-secondary">{label}</span>
      </div>
    ))}
  </div>
);

export default FloorMapLegend;
