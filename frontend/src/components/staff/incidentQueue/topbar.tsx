import { useState } from "react";
import PaginationStaff from "./pagination";
// import Pagination from "./pagination";

export interface Incident {
  id: string;
  room: string;
  floor: string;
  title: string;
  desc: string;
  severity: Severity;
  type: IncidentType;
  aiTag: string;
  time: string;
  live: boolean;
}
// constants/incidents.ts

const filterTabs = ["ALL", "CRITICAL", "MEDICAL", "FIRE", "RESOLVED"] as const;
export type FilterTab = (typeof filterTabs)[number];

// types/incident.ts

export type Severity = "CRITICAL" | "MODERATE" | "RESOLVED";
export type IncidentType = "MEDICAL" | "FIRE" | "SECURITY" | "MAINTENANCE";

// constants/colorMaps.ts
// put all color maps here so both IncidentCard and FilterBar can import them

// export const severityLeftBorderMap: Record<string, string> = {
//   CRITICAL: "border-l-critical",
//   MODERATE: "border-l-moderate",
//   RESOLVED: "border-l-text-faint",
// };

// export const severityBadgeMap: Record<string, string> = {
//   CRITICAL: "bg-critical-muted text-critical border-critical-border",
//   MODERATE: "bg-moderate-muted text-moderate border-moderate-border",
//   RESOLVED: "bg-surface-raised text-text-faint border-border",
// };

// export const typeTagMap: Record<string, string> = {
//   MEDICAL: "bg-accent-muted text-accent border-accent-border",
//   FIRE: "bg-moderate-muted text-moderate border-moderate-border",
//   SECURITY: "bg-surface-raised text-text-secondary border-border",
//   MAINTENANCE: "bg-resolved-muted text-resolved border-resolved-border",
// };

const IncidentFeedHeader = ({
  page,
  handlePage,
}: {
  page: number;
  handlePage: (id: number) => void;
}) => {
  const [active, setActive] = useState<FilterTab>("ALL");

  return (
    <div className="flex items-center justify-between px-5 py-3 bg-base-raised border-b border-border sticky top-0 z-10 h-fit w-full">
      <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
        Incident Queue — Live
      </span>
      {/* <Pagination
        currentPage={100}
        totalPages={1000}
      /> */}
      <PaginationStaff handlePage={handlePage} />
      <div className="flex items-center gap-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`
              font-mono text-[10px] font-medium px-3 py-1.5 rounded
              border tracking-widest uppercase transition-all cursor-pointer
              ${
                active === tab
                  ? "bg-surface-raised border-border text-text-primary"
                  : "bg-transparent  border-border text-text-faint hover:text-text-secondary hover:border-border"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IncidentFeedHeader;
