import AreaChartData from "./AreaChart";

interface areaChartProps {
  day: string;
  minutes: number;
}

function AdminAreaChart({ data }: { data: areaChartProps[] }) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-border-focus rounded-lg w-full bg-surface">
      <h3 className="uppercase text-text-secondary tracking-wider font-sans text-sm ">
        Avg resolution time — 7 days
      </h3>
      <div>
        <AreaChartData data={data} />
      </div>
    </div>
  );
}

export default AdminAreaChart;
