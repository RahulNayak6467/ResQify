import { useEffect } from "react";
import ChartLayout from "../charts/chartlayout";
import StatCard from "../StatCard";
import { useAdmin } from "../../context/adminContext";
import {
  getActiveIncidentData,
  getAIAccuracy,
  getAILatency,
  getStaffOnline,
} from "../../lib/queris";

function AdminOverviewPage() {
  useEffect(() => {
    const fetchData = async () => {
      const AIAccuracy = await getAIAccuracy();
      const AILatency = await getAILatency();
      const ActiveIncidents = await getActiveIncidentData();
      const StaffOnline = await getStaffOnline();
      console.log(AIAccuracy);
      console.log(AILatency);
      console.log(ActiveIncidents);
      console.log(StaffOnline);
    };
    fetchData();
  }, []);
  const { overview } = useAdmin();
  const [
    AIAccuracy,
    AILatency,
    ActiveIncidents,
    StaffOnline,
    PercentageResolved,
  ] = overview;
  console.log(overview);
  return (
    <div className="mx-auto max-w-7xl bg-base-raised/40  flex flex-col gap-3 p-8 border border-border ">
      <div className="grid grid-cols-5 gap-3">
        <StatCard
          //   num={AIAccuracy}
          num={ActiveIncidents}
          label="Active Incidents"
          delta="↑ 2 from last hour"
          color="#ff3b3b"
        />
        <StatCard
          num={`${AIAccuracy}%`}
          label="AI Accuracy"
          delta="147 classifications"
          color="#ffaa00"
        />
        <StatCard
          num={`${AILatency}s`}
          label="Avg AI Latency"
          delta="↓ 0.3s faster"
          color="#00d97e"
        />
        <StatCard
          num={`${PercentageResolved}%`}
          label="Resolution Rate"
          delta="Within 15 minutes"
          color="#4a9eff"
        />
        <StatCard
          num={StaffOnline}
          label="Staff Online"
          delta="2 deployed · 6 standby"
          color="#a855f7"
        />
      </div>
      <div>{/* <HotelMapLayout /> */}</div>
      <div>
        <ChartLayout />
      </div>
    </div>
  );
}

export default AdminOverviewPage;
