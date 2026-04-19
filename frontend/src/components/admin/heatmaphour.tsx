import { useState } from "react";

interface HeatMapRowProps {
  days: number;
  hours: number[];
}

const assignColor = (count: number) => {
  if (count === 0) return "#161c2a";
  if (count <= 2) return "#FF3B3B30";
  if (count <= 4) return "#FF3B3B50";
  if (count <= 6) return "#ff3b3b70";
  return "#ff3b3b";
};

const assignDay = (day: number) => {
  const map: Record<number, string> = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  };
  return map[day] ?? "";
};

function HeatMapHour({ data }: { data: HeatMapRowProps }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-2">
      <p className="text-text-faint text-[10px] font-mono w-8 text-right shrink-0">
        {assignDay(data.days)}
      </p>
      <div className="flex gap-0.5 flex-1">
        {data.hours.map((count, index) => (
          <div
            key={index}
            className="relative flex-1"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{ backgroundColor: assignColor(count) }}
              className="h-5 w-full rounded-[2px] border border-border/30 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
            {hoveredIndex === index && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                <div className="bg-surface-raised border border-border-strong rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                  <p className="text-text-primary font-mono text-[10px] font-semibold">
                    {count} incident{count !== 1 ? "s" : ""}
                  </p>
                  <p className="text-text-faint font-mono text-[10px] mt-0.5">
                    {String(index).padStart(2, "0")}:00 –{" "}
                    {String(index + 1).padStart(2, "0")}:00
                  </p>
                </div>
                <div className="w-1.5 h-1.5 bg-surface-raised border-r border-b border-border-strong rotate-45 mx-auto -mt-[3px]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeatMapHour;
