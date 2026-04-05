import HeatMap from "../admin/heatmap";
import AIConfidenceCard from "./adminchart/AIconfidencecard";
import AdminAreaChart from "./adminchart/areachart/adminareachart";
import AdminPieChart from "./adminchart/piechart/adminpiechart";

const incidentTypeBreakdown = [
  { type: "Medical", value: 38, fill: "#4a9eff" },
  { type: "Fire / Smoke", value: 22, fill: "#ffaa00" },
  { type: "Security", value: 18, fill: "#ff3b3b" },
  { type: "Maintenance", value: 22, fill: "#00d97e" },
];

const resolutionTime = [
  { day: "Mon", minutes: 18 },
  { day: "Tue", minutes: 22 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 19 },
  { day: "Fri", minutes: 12 },
  { day: "Sat", minutes: 14 },
  { day: "Sun", minutes: 11 },
];

function ChartLayout() {
  return (
    <div>
      {/* <AdminAreaChart data={resolutionTime} />
      <div className="grid grid-cols-[1fr_1fr] ">
        <AdminPieChart data={incidentTypeBreakdown} />
        <AIConfidenceCard />
      </div> */}
      <div>
        <AdminAreaChart data={resolutionTime} />
      </div>
      <div className="grid grid-cols-[1fr_350px] gap-x-4 ">
        <div className="flex flex-col gap-4">
          <HeatMap />
          <AdminPieChart data={incidentTypeBreakdown} />
        </div>
        <div className="mt-4">
          <AIConfidenceCard />
        </div>
      </div>
    </div>
  );
}

export default ChartLayout;
