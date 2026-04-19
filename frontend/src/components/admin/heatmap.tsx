import { useAdmin } from "../../context/adminContext";
import HeatMapHour from "./heatmaphour";

const LEGEND_COLORS = [
  "#161c2a",
  "#FF3B3B30",
  "#FF3B3B50",
  "#ff3b3b70",
  "#ff3b3b",
];

function HeatMap() {
  const { heatmap } = useAdmin();

  return (
    <div className="bg-base-raised border border-border rounded-lg px-5 py-5 mt-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-secondary text-[11px] font-mono uppercase tracking-widest">
          Incident Heatmap — Last 7 Days
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-text-faint text-[10px] font-mono">Less</span>
          <div className="flex gap-0.5">
            {LEGEND_COLORS.map((color) => (
              <div
                key={color}
                className="w-3 h-3 rounded-[2px] border border-border/30"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-text-faint text-[10px] font-mono">More</span>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-0.5">
        {heatmap.map((row: { days: number; hours: number[] }) => (
          <HeatMapHour key={`day-${row.days}`} data={row} />
        ))}
      </div>

      {/* Time axis — mirrors the flex-1 cell structure for pixel-perfect alignment */}
      <div className="flex items-center gap-2 mt-1.5">
        <div className="w-8 shrink-0" />
        <div className="flex flex-1">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="flex-1 flex justify-center">
              {[0, 6, 12, 18, 23].includes(i) && (
                <span className="text-[9px] font-mono text-text-faint whitespace-nowrap">
                  {String(i).padStart(2, "0")}:00
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeatMap;
