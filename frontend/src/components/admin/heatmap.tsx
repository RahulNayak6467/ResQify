import { useAdmin } from "../../context/adminContext";
import HeatMapHour from "./heatmaphour";

const incidentHeatmap = [
  {
    day: "Mon",
    hours: [
      1, 1, 0, 1, 1, 2, 2, 3, 3, 3, 2, 4, 3, 2, 3, 2, 4, 4, 4, 3, 3, 2, 2, 2,
    ],
  },
  {
    day: "Tue",
    hours: [
      1, 0, 1, 1, 1, 1, 2, 2, 0, 4, 3, 4, 4, 4, 1, 3, 3, 4, 4, 2, 4, 3, 2, 2,
    ],
  },
  {
    day: "Wed",
    hours: [
      1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 4, 1, 2, 2, 0, 2, 2, 3, 4, 4, 2, 2, 2, 2,
    ],
  },
  {
    day: "Thu",
    hours: [
      1, 1, 0, 1, 0, 2, 2, 2, 2, 0, 4, 4, 3, 2, 4, 1, 3, 4, 0, 4, 2, 3, 2, 2,
    ],
  },
  {
    day: "Fri",
    hours: [
      1, 1, 1, 1, 1, 1, 2, 0, 2, 2, 0, 3, 4, 1, 2, 2, 3, 3, 2, 4, 3, 2, 2, 2,
    ],
  },
  {
    day: "Sat",
    hours: [
      1, 1, 0, 1, 1, 0, 1, 4, 1, 2, 2, 3, 2, 2, 3, 2, 2, 3, 4, 3, 3, 2, 2, 2,
    ],
  },
  {
    day: "Sun",
    hours: [
      1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 1,
    ],
  },
];

function HeatMap() {
  const { heatmap } = useAdmin();
  console.log("Heatmap: ", heatmap);
  return (
    <div className="bg-surface  border-2 border-border-strong rounded-lg px-4  py-5 mt-4 w-full">
      <div>
        <h3 className="text-text-secondary text-sm font-sans tracking-wider font-medium">
          Incident heatmap — last 7 day
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-y-0.5 mt-4">
        {heatmap.map((heatmap) => (
          <HeatMapHour
            key={`day-${heatmap.day}-${heatmap.hours.length}`}
            data={heatmap}
          />
        ))}
      </div>
      <div className="grid grid-cols-24 ml-10 mt-1">
        <p className="text-text-secondary col-start-1  font-mono text-[10px]">
          00:00
        </p>
        <p className="text-text-secondary col-start-7  font-mono text-[10px]">
          06:00
        </p>
        <p className="text-text-secondary col-start-13  font-mono text-[10px]">
          12:00
        </p>
        <p className="text-text-secondary col-start-19   font-mono text-[10px]">
          18:00
        </p>
        <p className="text-text-secondary col-start-24  font-mono text-[10px]">
          23:00
        </p>
      </div>
      <div className="flex gap-1 mt-2 items-center">
        <p className="text-text-secondary text-[11px] font-extralight font-mono   ">
          Less
        </p>
        <div className="flex gap-0.5 items-center">
          <div className="w-3 h-3 border border-border bg-surface-raised rounded-t-[2px] rounded-b-[2px]"></div>
          <div className="w-3 h-3 border border-border bg-critical-muted rounded-t-[2px] rounded-b-[2px]"></div>
          <div className="w-3 h-3 border border-border bg-critical-border rounded-t-[2px] rounded-b-[2px]"></div>
          <div className="w-3 h-3 border border-border bg-critical opacity-70 rounded-t-[2px] rounded-b-[2px]"></div>
          <div className="w-3 h-3 border border-border bg-critical rounded-t-[2px] rounded-b-[2px]"></div>
        </div>
        <p className="text-text-secondary text-[11px] font-extralight font-mono ">
          More
        </p>
      </div>
    </div>
  );
}

export default HeatMap;
