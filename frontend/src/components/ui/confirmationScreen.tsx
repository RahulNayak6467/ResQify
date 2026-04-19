// import { CheckIcon } from "lucide-react";
// import useClassify from "../../hooks/useClassify";
// import { useLocation } from "react-router-dom";

// const ConfirmationScreen = () => {
//   const { state } = useLocation();
//   const { incident, classification } = state;
//   console.log(state);
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-base px-6 py-12">
//       {/* check ring */}
//       <div className="w-18 h-18 rounded-full border border-resolved-border bg-resolved-muted flex items-center justify-center mb-7">
//         <CheckIcon size={28} className="text-resolved" strokeWidth={2.5} />
//       </div>

//       {/* heading */}
//       <h1 className="font-display font-extrabold text-4xl text-text-primary text-center tracking-tight leading-tight mb-3">
//         Help is on the way
//       </h1>
//       <p className="font-mono text-sm text-text-secondary text-center leading-relaxed mb-8">
//         Your report has been classified and dispatched.
//         <br />A team member will reach you shortly.
//       </p>

//       {/* detail card */}
//       <div className="w-full max-w-md bg-base-raised border border-border rounded-xl overflow-hidden">
//         {[
//           { key: "Incident ID", val: incident?.INC_code, style: "font-mono" },
//           {
//             key: "Classified as",
//             val: (
//               <span className="badge-accent">
//                 {classification?.emergency_category}
//               </span>
//             ),
//           },
//           {
//             key: "Severity",
//             val: (
//               <span className="badge-critical">
//                 {classification?.incident_severity}
//               </span>
//             ),
//           },
//           { key: "Dispatched to", val: classification?.emergency_category },
//         ].map(({ key, val, style }) => (
//           <div
//             key={key}
//             className="flex items-center justify-between px-5 py-3.5 border-b border-border last:border-b-0"
//           >
//             <span className="font-mono text-xs text-text-secondary">{key}</span>
//             <span
//               className={`font-mono text-sm font-medium text-text-secondary ${style ?? ""}`}
//             >
//               {val}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default ConfirmationScreen;

import { CheckIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseclient";
import { formatTime } from "../../lib/utils";

const ConfirmationScreen = () => {
  const { state } = useLocation();
  const { incident, classification } = state;
  console.log("incident:", incident);
  console.log("classification: ", classification);
  const navigate = useNavigate();
  //   console.log(state);
  const [recentIncidents, setRecentIncidents] = useState<
    { id: string; type: string; status: string; time: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .range(0, 2);
      if (error) {
        throw new Error(error.message);
      }
      const requiredData = data.map((data) => {
        return {
          id: data?.INC_code,
          type: data?.user_query,
          status: data?.incident_severity,
          time: formatTime(data?.created_at),
        };
      });
      setRecentIncidents(requiredData);
    };
    fetchData();
  }, []);

  console.log(recentIncidents);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base px-6 py-12">
      {/* check ring */}
      <div className="w-18 h-18 rounded-full border border-resolved-border bg-resolved-muted flex items-center justify-center mb-7">
        <CheckIcon size={28} className="text-resolved" strokeWidth={2.5} />
      </div>

      {/* heading */}
      <h1 className="font-display font-extrabold text-4xl text-text-primary text-center tracking-tight leading-tight mb-3">
        Help is on the way
      </h1>
      <p className="font-mono text-sm text-text-secondary text-center leading-relaxed mb-8">
        Your report has been classified and dispatched.
        <br />A team member will reach you shortly.
      </p>

      {/* detail card */}
      <div className="w-full max-w-md bg-base-raised border border-border rounded-xl overflow-hidden mb-4">
        {[
          { key: "Incident ID", val: incident?.INC_code, style: "font-mono" },
          {
            key: "Classified as",
            val: (
              <span className="badge-accent">
                {classification?.emergency_category}
              </span>
            ),
          },
          {
            key: "Severity",
            val: (
              <span className="badge-critical">
                {classification?.incident_severity}
              </span>
            ),
          },
          { key: "Dispatched to", val: classification?.emergency_category },
        ].map(({ key, val, style }) => (
          <div
            key={key}
            className="flex items-center justify-between px-5 py-3.5 border-b border-border last:border-b-0"
          >
            <span className="font-mono text-xs text-text-secondary">{key}</span>
            <span
              className={`font-mono text-sm font-medium text-text-secondary ${style ?? ""}`}
            >
              {val}
            </span>
          </div>
        ))}
      </div>

      {/* past incidents card */}
      <div className="w-full max-w-md bg-base-raised border border-border rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <span className="font-mono text-[10px] text-text-faint uppercase tracking-widest">
            Your recent incidents
          </span>
          {/* YOU WIRE THIS: replace with real count */}
          <span className="font-mono text-[10px] text-text-faint">3 total</span>
        </div>

        {/* YOU WIRE THIS: replace with real past incidents mapped from DB */}
        {/* {[
          {
            id: incident?.INC_code,
            type: classification?.emergency_category,
            status: "dispatched",
            time: "just now",
          },
          {
            id: "INC_Code-3201",
            type: "Medical",
            status: "resolved",
            time: "2h ago",
          },
          {
            id: "INC_Code-2847",
            type: "Security",
            status: "resolved",
            time: "yesterday",
          },
              ] */}
        {recentIncidents.map((inc) => (
          <div
            key={inc.id}
            className="flex items-center justify-between px-5 py-3.5 border-b border-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  inc.status === "dispatched"
                    ? "bg-critical"
                    : "bg-resolved opacity-60"
                }`}
              />
              <div>
                <p className="font-mono text-sm line-clamp-1 font-medium text-text-primary leading-none">
                  {inc.type}
                </p>
                {/* <p className="font-mono text-[10px] text-text-faint mt-1">
                  {inc.id}
                </p> */}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`font-mono text-[9px]  font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                  inc.status === "dispatched"
                    ? "bg-critical-muted text-critical"
                    : "bg-resolved-muted text-resolved"
                }`}
              >
                {inc.status}
              </span>
              <span className="font-mono text-[10px] text-text-faint">
                {inc.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* buttons */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {/* YOU WIRE THIS: add onClick to navigate back to form */}
        <button
          onClick={() => navigate("/guest")}
          className="w-full bg-critical text-white font-mono font-semibold text-sm tracking-widest rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-[#e82020] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,59,59,0.25)] hover:shadow-[0_8px_24px_rgba(255,59,59,0.35)] transition-all duration-200 active:translate-y-0"
        >
          <PlusIcon size={15} strokeWidth={2.5} />
          REPORT ANOTHER INCIDENT
        </button>

        {/* YOU WIRE THIS: add onClick to navigate home */}
        {/* <button className="w-full bg-transparent text-text-secondary font-mono font-semibold text-sm tracking-widest rounded-xl py-3.5 flex items-center justify-center gap-2 border border-border hover:border-border-strong hover:text-text-primary transition-all duration-200">
          <HomeIcon size={15} strokeWidth={2} />
          BACK TO HOME
        </button> */}
      </div>

      {/* footer note */}
      <p className="font-mono text-xs text-text-faint text-center leading-relaxed mt-8">
        <span className="text-critical">For life-threatening emergencies</span>{" "}
        always call 112 / 911
        <br />
        first. This system notifies hotel staff in parallel.
      </p>
    </div>
  );
};

export default ConfirmationScreen;
