import { useStaff } from "../../../context/staffContext";
import Loader from "../../ui/Loader";

const severityBadgeMap: Record<string, string> = {
  CRITICAL: "bg-critical-muted text-critical border-critical-border",
  MODERATE: "bg-moderate-muted text-moderate border-moderate-border",
  RESOLVED: "bg-surface-raised text-resolved border-resolved-border",
  LOW: "bg-accent-raised text-accent border-accent-border",
};

function IncidentDetail() {
  const { selectedIncident } = useStaff();
  //   if (isLoading) {
  //     return (
  //       <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
  //     );
  //   }
  if (!selectedIncident)
    return (
      <div className="p-4 text-text-faint text-[11px] font-mono">
        Select an incident to view details
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-4 pb-2 w-fit mx-auto border-b border-b-border-strong h-fit">
      <div>
        <h3 className="text-text-secondary  tracking-wider text-[10px] uppercase font-sans font-normal">
          Incident Detail
        </h3>
      </div>
      <div>
        <p className="text-text-primary font-semibold font-sans text-[12px] line-clamp-1">
          {selectedIncident?.aiclassification?.ai_summary}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-text-primary brightness-70 px-3 py-0.5 bg-surface-raised border border-border-focus text-[11px] rounded-sm">
          {selectedIncident?.INC_code}
        </span>
        <span className="text-text-primary brightness-70 px-3 py-0.5  bg-surface-raised border border-border-focus text-[11px] rounded-sm">
          Floor {Math.floor(selectedIncident?.room_number / 100)}
        </span>
        <span
          className={` ${severityBadgeMap[selectedIncident?.incident_severity.toUpperCase()]}  py-0.5 border-2 px-3 uppercase text-[11px] font-sans rounded-sm`}
        >
          {selectedIncident?.incident_severity}
        </span>
      </div>
    </div>
  );
}

export default IncidentDetail;
