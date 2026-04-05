import ChartLayout from "../charts/chartlayout";
import StatCard from "../StatCard";

function AdminOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl mt-12 flex flex-col gap-3">
      <div className="grid grid-cols-5 gap-3">
        <StatCard
          num="3"
          label="Active Incidents"
          delta="↑ 2 from last hour"
          color="#ff3b3b"
        />
        <StatCard
          num="98.4%"
          label="AI Accuracy"
          delta="147 classifications"
          color="#ffaa00"
        />
        <StatCard
          num="1.2s"
          label="Avg AI Latency"
          delta="↓ 0.3s faster"
          color="#00d97e"
        />
        <StatCard
          num="94%"
          label="Resolution Rate"
          delta="Within 15 minutes"
          color="#4a9eff"
        />
        <StatCard
          num="8"
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
