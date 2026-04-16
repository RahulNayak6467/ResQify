import { useEffect } from "react";
import { useAdmin } from "../../context/adminContext";
import { getResolutionTime } from "../../lib/utils";
import HeatMap from "../admin/heatmap";
import AIConfidenceCard from "./adminchart/AIconfidencecard";
import AdminAreaChart from "./adminchart/areachart/adminareachart";
import AdminPieChart from "./adminchart/piechart/adminpiechart";
import { getIncidents } from "../../lib/queris";

// const resolutionTime = [
//   { day: "Mon", minutes: 18 },
//   { day: "Tue", minutes: 22 },
//   { day: "Wed", minutes: 15 },
//   { day: "Thu", minutes: 19 },
//   { day: "Fri", minutes: 12 },
//   { day: "Sat", minutes: 14 },
//   { day: "Sun", minutes: 11 },
// ];

interface TimeProps {
  created_at: string;
  resolved_at: string;
}

function ChartLayout() {
  const { incidentGraph, resolvedTime } = useAdmin();
  console.log(resolvedTime);
  const resolvedTimeArr = resolvedTime
    .slice(0, 10)
    .map((time: TimeProps, index: number) => {
      return {
        incident: index + 1,
        resolutionTime: getResolutionTime(time.created_at, time.resolved_at),
      };
    });

  console.log(resolvedTimeArr);

  console.log(incidentGraph);
  const Medical = incidentGraph.filter(
    (inc: { emergency_team: string }) => inc.emergency_team === "Medical",
  ).length;
  const Security = incidentGraph.filter(
    (inc: { emergency_team: string }) => inc.emergency_team === "Security",
  ).length;
  const Fire = incidentGraph.filter(
    (inc: { emergency_team: string }) => inc.emergency_team === "Fire",
  ).length;
  const Maintenance = incidentGraph.filter(
    (inc: { emergency_team: string }) => inc.emergency_team === "Maintenance",
  ).length;

  useEffect(() => {
    getIncidents();
  }, []);

  const incidentTypeBreakdown = [
    {
      type: "Medical",
      value: Medical,
      fill: "#4a9eff",
    },
    {
      type: "Fire / Smoke",
      value: Fire,
      fill: "#ffaa00",
    },
    {
      type: "Security",
      value: Security,
      fill: "#ff3b3b",
    },
    {
      type: "Maintenance",
      value: Maintenance,
      fill: "#00d97e",
    },
  ];
  return (
    <div>
      {/* <AdminAreaChart data={resolutionTime} />
      <div className="grid grid-cols-[1fr_1fr] ">
        <AdminPieChart data={incidentTypeBreakdown} />
        <AIConfidenceCard />
      </div> */}
      <div>
        <AdminAreaChart data={resolvedTimeArr} />
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
