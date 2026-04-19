// import { aiDashboardData } from "../../constants/legends";

import { useAdmin } from "../../context/adminContext";
import StatCard from "../StatCard";

// const { stats } = aiDashboardData;

// const AIStatsStrip = () => {
//   return (
//     <div className="grid grid-cols-5 gap-4 shadow-xl">
//       <div className="bg-base-raised border border-border rounded-xl p-4">
//         <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
//           Today's Classifications
//         </p>
//         <p className="font-mono text-3xl font-semibold text-purple-400 mb-1">
//           {stats.totalClassifications}
//         </p>
//         <p className="font-mono text-xs text-text-faint">
//           ↑ {stats.vsYesterday} vs yesterday
//         </p>
//       </div>

//       <div className="bg-base-raised border border-border rounded-xl p-4">
//         <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
//           Avg Latency
//         </p>
//         <p className="font-mono text-3xl font-semibold text-resolved mb-1">
//           {stats.avgLatency}
//         </p>
//         <p className="font-mono text-xs text-text-faint">
//           p95: {stats.p95Latency}
//         </p>
//       </div>

//       <div className="bg-base-raised border border-border rounded-xl p-4">
//         <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
//           High Confidence
//         </p>
//         <p className="font-mono text-3xl font-semibold text-text-primary mb-1">
//           {stats.highConfidence}
//         </p>
//         <p className="font-mono text-xs text-text-faint">
//           {stats.highConfidenceThreshold} threshold
//         </p>
//       </div>

//       <div className="bg-base-raised border border-border rounded-xl p-4">
//         <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
//           Escalations
//         </p>
//         <p className="font-mono text-3xl font-semibold text-warn mb-1">
//           {stats.escalations}
//         </p>
//         <p className="font-mono text-xs text-text-faint">
//           {stats.escalationNote}
//         </p>
//       </div>

//       <div className="bg-base-raised border border-border rounded-xl p-4">
//         <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
//           Model
//         </p>
//         <p className="font-mono text-2xl font-semibold text-text-primary mb-1">
//           {stats.model}
//         </p>
//         <p className="font-mono text-xs text-text-faint">{stats.modelNote}</p>
//       </div>
//     </div>
//   );
// };

// export default AIStatsStrip;

function AIStatsStrip() {
  const { overview } = useAdmin();
  const [AIAccuracy, AILatency, ActiveIncidents, , PercentageResolved] =
    overview;
  return (
    <div className="grid grid-cols-5 gap-x-3">
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
        num={"Model"}
        label="llama-3.3"
        delta="llama-3.3"
        color="#a855f7"
      />
    </div>
  );
}

export default AIStatsStrip;
