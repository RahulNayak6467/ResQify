import Analysis from "./aianalysis";
import IncidentDetail from "./incidentdetail";
import IncidentTimeline from "./timelinevent";

function RightBarLayout() {
  return (
    <div className="flex flex-col bg-base-raised w-full border-l border-l-border h-screen">
      <IncidentDetail />
      <Analysis />
      <IncidentTimeline />
      <div className="flex flex-col gap-2 border-b border-b-border-strong h-full  pb-4">
        <button
          type="button"
          className="uppercase text-critical text-[12px] py-2 w-[95%] mx-auto bg-critical-muted border border-critical-border rounded-md hover:brightness-125 transition-all cursor-pointer"
        >
          escalate to 112
        </button>
        <button
          type="button"
          className="uppercase text-resolved text-[12px] py-2 w-[95%] mx-auto bg-resolved-muted border border-resolved-border rounded-md cursor-pointer hover:brightness-125 transition-all"
        >
          Mark resolved
        </button>
        <button
          type="button"
          className="uppercase text-text-secondary text-[12px] py-2 w-[95%] mx-auto bg-surface border border-border rounded-md hover:brightness-125 transition-all cursor-pointer"
        >
          Add note
        </button>
      </div>
    </div>
  );
}

export default RightBarLayout;
