import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface areaChartProps {
  day: string;
  minutes: number;
}

function AreaChartData({ data }: { data: areaChartProps[] }) {
  return (
    <AreaChart
      style={{
        width: "100%",

        maxHeight: "15vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      onContextMenu={(_, e) => e.preventDefault()}
    >
      <defs>
        <linearGradient id="resGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d97e" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#00d97e" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <CartesianGrid
        horizontal={true}
        vertical={false}
        stroke="rgba(255,255,255,0.05)"
      />

      {/* <CartesianGrid /> */}
      {/* <XAxis dataKey="day" /> */}
      <XAxis
        dataKey="day"
        tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#5a6475" }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="minutes"
        stroke="#00d97e"
        strokeWidth={2}
        fill="#00d97e"
        dot={{ r: 4, fill: "#0c0f16", stroke: "#00d97e", strokeWidth: 2 }}
      />
    </AreaChart>
  );
}

export default AreaChartData;
