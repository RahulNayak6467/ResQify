type Severity = "CRITICAL" | "MODERATE" | "RESOLVED";
type IncidentType = "MEDICAL" | "FIRE" | "SECURITY" | "MAINTENANCE";

interface Incident {
  id: string;
  room: string;
  floor: string;
  title: string;
  desc: string;
  severity: Severity;
  type: IncidentType;
  aiTag: string;
  time: string;
  live?: boolean;
  confidence?: string;
  oneLineSummary: string;
  onClick: () => void;
}

// const severityLeftBorderMap: Record<string, string> = {
//   CRITICAL: "border-l-critical",
//   MODERATE: "border-l-moderate",
//   RESOLVED: "border-l-text-faint",
// };

const severityBadgeMap: Record<string, string> = {
  CRITICAL: "bg-critical-muted text-critical border-critical-border",
  MODERATE: "bg-moderate-muted text-moderate border-moderate-border",
  RESOLVED: "bg-surface-raised text-resolved border-resolved-border",
  LOW: "bg-accent-raised text-accent border-accent-border",
};

const typeTagMap: Record<string, string> = {
  MEDICAL: "bg-accent-muted text-accent border-accent-border",
  FIRE: "bg-moderate-muted text-moderate border-moderate-border",
  SECURITY: "bg-surface-raised text-text-secondary border-border",
  MAINTENANCE: "bg-resolved-muted text-resolved border-resolved-border",
};

function IncidentFeed({
  id,
  room,
  floor,
  severity,
  time,
  //   title,
  desc,
  type,
  aiTag,
  live,
  confidence,
  oneLineSummary,
  onClick,
}: Incident) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 p-4 bg-base cursor-pointer hover:bg-surface transition-all border-b border-border"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <span className="text-[10px] uppercase text-text-secondary font-sans font-extralight tracking-wider">
            {id}
          </span>
          <span className="text-[10px] uppercase text-text-secondary font-mono font-extralight tracking-wider">
            ROOM {room}
          </span>
          <span className="text-[10px] uppercase text-text-secondary font-mono font-extralight tracking-wider">
            FLOOR {Math.floor(Number(floor) / 100)}
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <p
            className={`${severityBadgeMap[severity.toUpperCase()]} ${typeTagMap[severity.toUpperCase()]} text-[10px] px-3 py-0.5 rounded-sm border`}
          >
            {severity.toUpperCase()}
          </p>
          <p className="text-text-secondary font-sans text-xs tracking-normal font-medium">
            {time}
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-text-primary text-md font-sans tracking-wider font-bold">
          {oneLineSummary}
        </h4>
      </div>
      <div>
        <p className="text-xs text-text-secondary font-sans ">{desc}</p>
      </div>
      <div className="flex items-center text-[10px] gap-2">
        <span className="bg-surface-raised text-text-secondary px-3 py-0.5 border border-border uppercase rounded-sm  font-extrabold">
          {type}
        </span>
        <span className="bg-surface-raised text-text-secondary px-3 py-0.5 border border-border uppercase rounded-sm font-extrabold">
          FLOOR {Number(floor) % 10}
        </span>
        <span className="text-accent border border-accent-muted bg-accent-muted px-3 py-0.5 rounded-sm font-extrabold">
          AI:{confidence}% {aiTag}
        </span>
        {live ? (
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-critical animate-blink" />
            <p className="text-critical text-[10px] uppercase tracking-widest">
              live
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default IncidentFeed;

//`text-critical bg-critical-muted text-[10px] px-4 py-0.5 rounded-sm border-2 border-critical-muted uppercase font-sans
