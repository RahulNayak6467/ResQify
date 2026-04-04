import { PieChart, Pie, Label } from "recharts";

interface incidentTypeBreakdownProps {
  type: string;
  value: number;
  fill: string;
}

function PieChartData({ data }: { data: incidentTypeBreakdownProps[] }) {
  return (
    <div
      className="w-fit p-4"
      style={{
        display: "flex",
        flexWrap: "wrap",

        minHeight: "150px",
        padding: "10px",
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
    >
      <PieChart
        responsive
        style={{
          height: "180px",
          width: "33%",
          flex: "1 1 200px",
          aspectRatio: 1,
        }}
      >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          innerRadius="60%"
          //   isAnimationActive={false}
          type="monotone"
        />
        <Label position="center" fill="#666">
          Total: 147
        </Label>
      </PieChart>
    </div>
  );
}

export default PieChartData;
