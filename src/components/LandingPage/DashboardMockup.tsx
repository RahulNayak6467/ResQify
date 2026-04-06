import { AreaChart, Area, ResponsiveContainer } from "recharts";

// ── data ──
const responseData = [
  { v: 50 },
  { v: 45 },
  { v: 55 },
  { v: 40 },
  { v: 25 },
  { v: 35 },
  { v: 28 },
  { v: 21 },
  { v: 32 },
  { v: 22 },
  { v: 20 },
  { v: 18 },
];

const barData = [
  { v: 6, color: "#00d97e" },
  { v: 9, color: "#00d97e" },
  { v: 7, color: "#00d97e" },
  { v: 14, color: "#ff3b3b" },
  { v: 5, color: "#00d97e" },
  { v: 11, color: "#ffaa00" },
  { v: 8, color: "#00d97e" },
  { v: 9, color: "#4a9eff" },
  { v: 5, color: "#00d97e" },
  { v: 7, color: "#00d97e" },
];

const alerts = [
  { label: "Fire — Floor 12", color: "bg-critical" },
  { label: "Medical — Room 405", color: "bg-moderate" },
  { label: "Resolved — Lobby", color: "bg-resolved" },
];

const maxBar = Math.max(...barData.map((b) => b.v));

// ── card shell ──
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-base border border-border rounded-xl p-5">{children}</div>
);

const CardHeader = ({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start justify-between mb-4">
    <p
      className="font-mono text-[10px] font-medium text-text-secondary
                  uppercase tracking-widest leading-relaxed whitespace-pre-line"
    >
      {label}
    </p>
    <div
      className="w-7 h-7 rounded-lg bg-base flex items-center
                    justify-center flex-shrink-0"
    >
      {icon}
    </div>
  </div>
);

const BigNum = ({ value, color }: { value: string; color: string }) => (
  <p className={`font-mono text-5xl font-medium leading-none mb-4 ${color}`}>
    {value}
  </p>
);

// ── cards ──
const ActiveAlerts = () => (
  <Card>
    <CardHeader
      label={"Active\nAlerts"}
      icon={
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff3b3b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      }
    />
    <BigNum value="3" color="text-critical" />
    <div className="flex flex-col gap-2">
      {alerts.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
          <span className="font-mono text-xs text-text-secondary">{label}</span>
        </div>
      ))}
    </div>
  </Card>
);

const ResponseTime = () => (
  <Card>
    <CardHeader
      label={"Response\nTime"}
      icon={
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00d97e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      }
    />
    <BigNum value="1.2s" color="text-resolved" />
    <ResponsiveContainer width="100%" height={70}>
      <AreaChart data={responseData}>
        <defs>
          <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d97e" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#00d97e" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="#00d97e"
          strokeWidth={2}
          fill="url(#resGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
);

const IncidentsPerWeek = () => (
  <Card>
    <CardHeader
      label={"Incidents /\nWeek"}
      icon={
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4a9eff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      }
    />
    <div className="flex items-end gap-1.5 h-20 pt-2">
      {barData.map(({ v, color }, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm rounded-b-none min-w-0 opacity-85
                     transition-all duration-300"
          style={{
            height: `${Math.round((v / maxBar) * 100)}%`,
            background: color,
          }}
        />
      ))}
    </div>
  </Card>
);

const GuestsOnline = () => (
  <Card>
    <CardHeader
      label={"Guests\nOnline"}
      icon={
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00d97e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      }
    />
    <BigNum value="847" color="text-resolved" />
    <div className="flex flex-col gap-2">
      {["All systems nominal", "IoT sensors active"].map((text) => (
        <div key={text} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-resolved flex-shrink-0" />
          <span className="font-mono text-xs text-text-secondary">{text}</span>
        </div>
      ))}
    </div>
  </Card>
);

// ── browser frame ──
const DashboardMockup = () => (
  <div className="bg-base z-100 relative rounded-2xl overflow-hidden border border-border">
    {/* titlebar */}
    <div
      className="bg-surface border-b border-border px-4 py-3
                    flex items-center justify-between"
    >
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <span className="font-mono text-[11px] text-text-faint">
        resqify://admin/dashboard
      </span>
      <div className="w-[52px]" />
    </div>

    {/* grid */}
    <div className="p-5 grid grid-cols-2 gap-3">
      <ActiveAlerts />
      <ResponseTime />
      <IncidentsPerWeek />
      <GuestsOnline />
    </div>
  </div>
);

export default DashboardMockup;
