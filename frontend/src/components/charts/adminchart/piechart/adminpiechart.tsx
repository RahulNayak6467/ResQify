import PieChartData from "./PieChart";
import IncidentTypeBreakdown from "./incidenttypebreakdowndata";

interface incidentTypeBreakdownProps {
  type: string;
  value: number;
  fill: string;
}

function AdminPieChart({ data }: { data: incidentTypeBreakdownProps[] }) {
  return (
    <div className="p-4 bg-base-raised border border-border rounded-lg ">
      <div className="flex justify-between">
        <h3 className="uppercase text-text-secondary tracking-wider font-sans text-sm ">
          Incident type breakdown
        </h3>
        <p className="text-text-faint text-xs font-sans tracking-wider">
          Total Incidents 11
        </p>
      </div>
      <div className="flex gap-4 items-center ">
        <div>
          <PieChartData data={data} />
        </div>
        <div className="w-full">
          <IncidentTypeBreakdown />
        </div>
      </div>
    </div>
  );
}

export default AdminPieChart;
