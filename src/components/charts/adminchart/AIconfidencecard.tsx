import type { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const aiConfidence: {
  type: string;
  confidence: number;
  color: string;
}[] = [
  { type: "Medical", confidence: 98, color: "#00d97e" },
  { type: "Fire", confidence: 96, color: "#00d97e" },
  { type: "Security", confidence: 91, color: "#ffaa00" },
  { type: "Maintenance", confidence: 99, color: "#00d97e" },
  { type: "Access", confidence: 100, color: "#00d97e" },
];

const weeklyAccuracy: { day: string; accuracy: number }[] = [
  { day: "Mon", accuracy: 95.2 },
  { day: "Tue", accuracy: 96.8 },
  { day: "Wed", accuracy: 97.1 },
  { day: "Thu", accuracy: 96.5 },
  { day: "Fri", accuracy: 98.0 },
  { day: "Sat", accuracy: 97.8 },
  { day: "Sun", accuracy: 98.4 },
];

const aiSummaryStats = {
  overallAvg: 98.4,
  apiCallsToday: 147,
};

const AIConfidenceCard: FC = () => (
  <div className="bg-surface  rounded-lg p-5 flex flex-col border border-border-focus ">
    {/* header */}
    <div className="flex items-start justify-between">
      <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest leading-tight">
        AI Confidence
        <br />
        Distribution
      </span>
      <span className="font-mono text-xs text-text-faint text-right">
        All 147
        <br />
        classifications
      </span>
    </div>

    {/* confidence bars */}
    <div className="flex flex-col">
      {aiConfidence.map(({ type, confidence, color }, i) => (
        <div
          key={type}
          className={`flex items-center gap-4 py-3 ${i !== aiConfidence.length - 1 ? "border-b border-border" : ""}`}
        >
          <span className="font-mono text-sm text-text-secondary w-24 flex-shrink-0">
            {type}
          </span>
          <div className="flex-1 h-1.5 bg-surface-raised rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${confidence}%`, background: color }}
            />
          </div>
          <span
            className="font-mono text-sm font-semibold w-10 text-right flex-shrink-0"
            style={{ color }}
          >
            {confidence}%
          </span>
        </div>
      ))}
    </div>

    {/* weekly accuracy trend */}
    <div>
      <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
        Weekly Accuracy Trend
      </p>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart
          data={weeklyAccuracy}
          margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d97e" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#00d97e" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="rgba(255,255,255,0.04)"
          />
          <XAxis
            dataKey="day"
            tick={{
              fontFamily: "IBM Plex Mono",
              fontSize: 10,
              fill: "#5a6475",
            }}
            axisLine={false}
            tickLine={false}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            stroke="#00d97e"
            strokeWidth={1.5}
            fill="url(#accGradient)"
            dot={{ r: 3, fill: "#111520", stroke: "#00d97e", strokeWidth: 1.5 }}
            activeDot={{ r: 4, fill: "#00d97e" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* summary stat tiles */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-surface-raised rounded-lg px-4 py-3">
        <div className="font-mono text-xl font-semibold text-resolved mb-1">
          {aiSummaryStats.overallAvg}%
        </div>
        <div className="font-mono text-[10px] text-text-faint uppercase tracking-widest">
          Overall Avg
        </div>
      </div>
      <div className="bg-surface-raised rounded-lg px-4 py-3">
        <div className="font-mono text-xl font-semibold text-accent mb-1">
          {aiSummaryStats.apiCallsToday}
        </div>
        <div className="font-mono text-[10px] text-text-faint uppercase tracking-widest">
          API Calls Today
        </div>
      </div>
    </div>
  </div>
);

export default AIConfidenceCard;
