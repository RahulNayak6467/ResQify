import { useEffect, useState } from "react";
import { useStaff } from "../../../context/staffContext";
import { supabase } from "../../../lib/supabaseclient";
import { formatTime } from "../../../lib/utils";
import { getApprovdedTimeData, getResolvedTimeData } from "../../../lib/queris";
import TimelineItem from "./Timelinecomponent";
import Loader from "../../ui/Loader";

interface TimelineEvent {
  label: string;
  time: string | null;
  status: "done" | "active" | "pending";
}

// const timeline: TimelineEvent[] = [
//   { label: "Guest submitted report", time: "23:03:12", status: "done" },
//   { label: "AI classified — cardiac 97%", time: "23:03:13", status: "done" },
//   { label: "Medical team notified", time: "23:03:14", status: "done" },
//   { label: "Medical team coming", time: "23:03:18", status: "active" },
//   { label: "Resolved", time: null, status: "pending" },
// ];

// const dotColorMap: Record<string, string> = {
//   done: "bg-resolved border-resolved",
//   active: "bg-moderate border-moderate animate-blink",
//   pending: "bg-transparent border-border2",
// };

// const textColorMap: Record<string, string> = {
//   done: "text-text-primary",
//   active: "text-moderate",
//   pending: "text-text-faint",
// };

const IncidentTimeline = () => {
  const { selectedIncident } = useStaff();
  const [approved_at, setApprovedAt] = useState<string | null>(null);
  const [resolved_at, setResolvedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedIncident) return;

    console.log(selectedIncident);
    const showData = async () => {
      //   setIsLoading(true);
      const approved_at = await getApprovdedTimeData(selectedIncident?.id);
      console.log(approved_at);
      //   setIsLoading(false);
      if (approved_at[0]?.approved_time) {
        setApprovedAt(approved_at[0]?.approved_time);
      } else {
        setApprovedAt(null);
      }
      //   setIsLoading(true);
      const resolved_at = await getResolvedTimeData(selectedIncident?.id);
      //   setIsLoading(false);
      console.log(resolved_at);
      if (resolved_at[0]?.resolved_at) {
        setResolvedAt(resolved_at[0]?.resolved_at);
      } else {
        setResolvedAt(null);
      }
      console.log(resolved_at);
    };
    showData();
  }, [selectedIncident]);

  if (!selectedIncident) return;
  console.log(formatTime(selectedIncident.created_at, 0));
  console.log(resolved_at);
  console.log(approved_at);

  if (isLoading) {
    return (
      <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
    );
  }

  return (
    <div className="flex mt-6 mx-auto flex-col">
      <TimelineItem
        label="Guest submitted report"
        time={formatTime(selectedIncident.created_at, 0)}
        status="done"
      />
      <TimelineItem
        label="AI classified — cardiac 97%"
        time={formatTime(
          selectedIncident.aiclassification.created_at,
          selectedIncident.aiclassification.response_time,
        )}
        status="done"
      />
      <TimelineItem
        label="Team notified"
        time={approved_at ? formatTime(approved_at) : ""}
        status={resolved_at ? "done" : approved_at ? "active" : "pending"}
      />
      {/* <TimelineItem
        label="Medical team coming"
        time={formatTime(new Date().toISOString())}
        status={
          approved_at !== null
            ? resolved_at !== null
              ? "done"
              : "active"
            : "pending"
        }
      /> */}
      <TimelineItem
        label="Resolved"
        time={resolved_at ? formatTime(resolved_at) : ""}
        status={resolved_at ? "done" : "pending"}
        isLast
      />
    </div>
  );
};

export default IncidentTimeline;
