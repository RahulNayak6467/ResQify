// constants/sidebar.ts

import FloorIncident from "./floorIncident";
import TeamStatus from "./TeamStatus";

interface sidebarCountsProps {
  All: number;
  Critical: number;
  Moderate: number;
  Resolved: number;
}

function Sidebar() {
  return (
    <div className="flex flex-col gap-8 px-4 py-6 bg-base-raised w-[250px] border-r border-r-border min-h-screen ">
      <div className="flex flex-col gap-">
        <h3 className="text-text-secondary uppercase text-[10px] font-mono tracking-wide">
          Incident Queue
        </h3>
        <div className="flex flex-col gap-2 text-xs mt-2">
          <div className="flex justify-between items-center bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-accent">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-white rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs font-extralight  py-1 rounded-md">
                All
              </p>
            </div>
            <p className="text-critical bg-critical-muted px-2 rounded-md">3</p>
          </div>
          <div className="flex justify-between items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-critical ">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-critical rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs   py-1 rounded-md">
                Critical
              </p>
            </div>
            <p className="text-critical bg-critical-muted px-2 rounded-md">2</p>
          </div>
          <div className="flex justify-between items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-moderate ">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-moderate rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs   py-1 rounded-md">
                Moderate
              </p>
            </div>
            <p className="text-moderate bg-moderate-muted px-2 rounded-md">1</p>
          </div>
          <div className="flex justify-between items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-resolved">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-resolved rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs   py-1 rounded-md">
                Resolved
              </p>
            </div>
            <p className="text-resolved bg-resolved-muted px-2 rounded-md">
              12
            </p>
          </div>
        </div>
      </div>
      <div>
        <FloorIncident />
      </div>
      <div>
        <TeamStatus />
      </div>
    </div>
  );
}

export default Sidebar;
