import AreaChartData from "./AreaChart";

// interface areaChartPropsData {
//   incident: string;
//   resolutiontime: number;
// }

interface ChartProps {
  incident: string;
  resolutionTime: number;
}

function AdminAreaChart({ data }: { data: ChartProps[] }) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-border-focus rounded-lg w-full bg-surface">
      <h3 className="uppercase text-text-secondary tracking-wider font-sans text-sm ">
        Avg resolution time last 10 incidents
      </h3>
      <div>
        <AreaChartData data={data} />
      </div>
    </div>
  );
}

export default AdminAreaChart;
