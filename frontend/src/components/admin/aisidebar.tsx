// import { aiDashboardData } from "../../constants/legends";
import { useAdmin } from "../../context/adminContext";
import IncidentTypeBreakdown from "../charts/adminchart/piechart/incidenttypebreakdowndata";
// import HeatMap from "./heatmap";

// const { categoryBreakdown } = aiDashboardData;

const AISidebar = () => {
  const { incidentGraph, heatmap } = useAdmin();

  console.log(incidentGraph);
  console.log("HeatMap:", heatmap);
  const date = new Date().getDay();

  const hourlyActivity = heatmap[date || 6];
  console.log(hourlyActivity?.hours);

  const greaterThanNinety = incidentGraph.filter(
    (confidence: { ai_confidence: number }) => confidence.ai_confidence >= 90,
  ).length;
  const greaterThanEighty = incidentGraph.filter(
    (confidence: { ai_confidence: number }) =>
      confidence.ai_confidence >= 80 && confidence.ai_confidence < 90,
  ).length;
  const greaterThanSeventy = incidentGraph.filter(
    (confidence: { ai_confidence: number }) =>
      confidence.ai_confidence >= 70 && confidence.ai_confidence < 80,
  ).length;
  const lessThanSeventy = incidentGraph.filter(
    (confidence: { ai_confidence: number }) => confidence.ai_confidence < 70,
  ).length;

  const confidenceBuckets = [
    { range: "90–100%", count: greaterThanNinety, color: "#00d97e" },
    { range: "80–89%", count: greaterThanEighty, color: "#ffaa00" },
    { range: "70–79%", count: greaterThanSeventy, color: "#4a9eff" },
    { range: "< 70%", count: lessThanSeventy, color: "#ff3b3b" },
  ];

  return (
    <div className="bg-base-raised border border-border rounded-xl h-full  p-5 flex flex-col gap-8">
      {/* category breakdown */}
      <div>
        <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-4">
          Category Breakdown
        </p>
        {/* <div className="flex flex-col gap-3">
          {categoryBreakdown.map((cat) => (
            <IncidentTypeBreakdown />
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: cat.color }}
                  />
                  <span className="font-mono text-sm text-text-primary">
                    {cat.label}
                  </span>
                </div>
                <span className="font-mono text-sm text-text-secondary">
                  {cat.count}
                  <span className="text-text-faint mx-1">·</span>
                  {cat.pct}%
                </span>
              </div>
              <div className="h-0.5 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${cat.pct}%`, background: cat.color }}
                />
              </div>
            </div>
          ))}
        </div> */}
        <IncidentTypeBreakdown />
      </div>

      {/* hourly activity */}
      <div>
        <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-4">
          Hourly Activity
        </p>
        <div className="flex items-end gap-1 h-14">
          {hourlyActivity?.hours?.map((val: number, i: number) => {
            const max = Math.max(...hourlyActivity.hours);
            return (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${(val / max) * 100}%`,
                  background: "#a78bfa",
                  opacity: 0.7,
                }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          {["00", "06", "12", "now"].map((label) => (
            <span key={label} className="font-mono text-[9px] text-text-faint">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* confidence buckets */}
      <div>
        <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-4">
          Confidence Buckets
        </p>
        <div className="flex flex-col gap-2">
          {confidenceBuckets.map((bucket) => (
            <div
              key={bucket.range}
              className="flex items-center justify-between px-3 py-2.5 bg-base border border-border rounded-lg"
            >
              <span className="font-mono text-sm text-text-secondary">
                {bucket.range}
              </span>
              <span
                style={{ color: bucket.color }}
                className={`font-mono text-sm font-semibold
                `}
              >
                {bucket.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISidebar;
