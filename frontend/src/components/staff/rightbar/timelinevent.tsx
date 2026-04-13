import { useStaff } from "../../../context/staffContext";
import { supabase } from "../../../lib/supabaseclient";

interface TimelineEvent {
  label: string;
  time: string | null;
  status: "done" | "active" | "pending";
}

const timeline: TimelineEvent[] = [
  { label: "Guest submitted report", time: "23:03:12", status: "done" },
  { label: "AI classified — cardiac 97%", time: "23:03:13", status: "done" },
  { label: "Medical team notified", time: "23:03:14", status: "done" },
  { label: "Medical team coming", time: "23:03:18", status: "active" },
  { label: "Resolved", time: null, status: "pending" },
];

const dotColorMap: Record<string, string> = {
  done: "bg-resolved border-resolved",
  active: "bg-moderate border-moderate animate-blink",
  pending: "bg-transparent border-border2",
};

const textColorMap: Record<string, string> = {
  done: "text-text-primary",
  active: "text-moderate",
  pending: "text-text-faint",
};

const formatTime = (timestamp: string, responseTime?: number) => {
  const date = new Date(
    new Date(timestamp).getTime() + (responseTime || 0) * 1000,
  );
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const IncidentTimeline = () => {
  //   const toTimestamptz = (date = new Date()) => {
  //     return date.toISOString();
  //   }; const updateApproved = async (id: string) => {
  //     const { data, error } = await supabase
  //       .from("incidentevents")
  //       .update({ approved_time: toTimestamptz() })
  //       .eq("incident_id", id);

  //     if (error) {
  //       throw new Error(error.message);
  //     }

  //     console.log(data);
  //   };
  const { selectedIncident } = useStaff();

  if (!selectedIncident) return;
  console.log(formatTime(selectedIncident.created_at, 0));
  console.log(
    formatTime(
      selectedIncident.aiclassification.created_at,
      selectedIncident.aiclassification.response_time,
    ),
  );

  return (
    <div className="p-8">
      <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
        Timeline
      </p>

      <div className="flex flex-col">
        {timeline.map(({ label, time, status }, i) => (
          <div key={i} className="flex gap-3 relative ">
            {/* vertical connector line */}
            {i !== timeline.length - 1 && (
              <div className="absolute left-[5px] top-3 bottom-0 w-px border border-border-strong bg-border2" />
            )}

            {/* dot */}
            <div
              className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${status === "active" ? "animate-blink" : ""} mt-0.5 z-10 ${dotColorMap[status]}`}
            />

            {/* text */}
            <div className="pb-4">
              <p
                className={`font-mono text-sm font-medium leading-tight ${textColorMap[status]}`}
              >
                {label}
              </p>
              <p className="font-mono text-xs text-text-faint mt-0.5">
                {time ?? "—"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentTimeline;
