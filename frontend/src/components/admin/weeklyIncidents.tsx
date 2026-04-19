// import { aiDashboardData } from "../../data/aiDashboardData";
// import { aiDashboardData } from "../../constants/legends";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseclient";
import { getAverageTime } from "../../lib/utils";

// const weeklyIncidents = [
//   { name: "Jayesh Patel", count: 23 },
//   { name: "Disha Patel", count: 19 },
//   { name: "Roopesh Dora", count: 15 },
//   { name: "Omswaroop K.", count: 12 },
// ];

// const fastestResponse = [
//   { rank: 1, name: "Disha Patel", avg: "1:58" },
//   { rank: 2, name: "Jayesh Patel", avg: "2:14" },
//   { rank: 3, name: "Roopesh Dora", avg: "3:47" },
//   { rank: 4, name: "Omswaroop K.", avg: "4:02" },
// ];

const StaffPerformance = () => {
  const [topPerformers, setTopPerformers] = useState<
    { first_name: string; last_name: string; incident_resolved: number; response_time: number }[]
  >([]);
  useEffect(() => {
    const getTopPerformers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name,last_name,incident_resolved,response_time")
        .order("incident_resolved", { ascending: false })
        .eq("role", "staff")
        .limit(6);

      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      setTopPerformers(data);
    };
    getTopPerformers();
  }, []);

  const weeklyIncidents = topPerformers.map((data) => {
    return {
      name: `${data.first_name} ${data.last_name}`,
      count: data.incident_resolved,
      time: data?.response_time,
    };
  });
  const fastestResponse = topPerformers
    .toSorted((a, b) => Number(a.response_time) - Number(b.response_time))
    .slice(0, 4)
    .map((data, index) => {
      return {
        rank: index + 1,
        name: `${data.first_name} ${data.last_name}`,
        avg: `${data?.response_time}`,
      };
    });

  const total = weeklyIncidents.reduce((acc, data) => acc + data.count, 0);
  return (
    <div className="grid grid-cols-2 gap-4 max-w-[1400px] mx-auto mb-4">
      {/* incidents handled */}
      <div className="bg-base-raised border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[10px] text-text-faint uppercase tracking-widest">
            Incidents Handled · This Week
          </span>
          <span className="font-mono text-[10px] text-text-faint">
            per staff member
          </span>
        </div>
        <div className="flex flex-col gap-4">
          {weeklyIncidents.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[130px_1fr_32px] items-center gap-4"
            >
              <span className="font-mono text-sm text-text-primary">
                {s.name}
              </span>
              <div className="h-4 bg-base rounded overflow-hidden">
                <div
                  className="h-full rounded"
                  style={{
                    width: `${(s.count / total) * 100}%`,
                    background: "linear-gradient(90deg, #a78bfa, #ec4899)",
                  }}
                />
              </div>
              <span className="font-mono text-sm text-text-primary text-right">
                {s.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* fastest response */}
      <div className="bg-base-raised border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[10px] text-text-faint uppercase tracking-widest">
            Fastest Response
          </span>
          <span className="font-mono text-[10px] text-text-faint">
            last 7 days
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {fastestResponse.map((s) => (
            <div
              key={s.rank}
              className="flex items-center gap-3 bg-base border border-border rounded-xl px-4 py-2"
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0 ${
                  s.rank === 1
                    ? "bg-moderate-muted text-moderate"
                    : "bg-base-raised text-text-faint"
                }`}
              >
                {s.rank}
              </span>
              <span className="font-mono text-sm text-text-primary flex-1">
                {s.name}
              </span>
              <span
                className={`font-mono text-sm font-semibold ${
                  s.rank === 4 ? "text-moderate" : "text-resolved"
                }`}
              >
                {getAverageTime(s.avg)} avg
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPerformance;
