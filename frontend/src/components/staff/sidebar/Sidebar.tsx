// constants/sidebar.ts

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseclient";
import FloorIncident from "./floorIncident";
import TeamStatus from "./TeamStatus";
import Loader from "../../ui/Loader";

// interface sidebarCountsProps {
//   All: number;
//   Critical: number;
//   Moderate: number;
//   Resolved: number;
// }

interface incidentTableDataProps {
  incident_severity: string;
}

function Sidebar({
  incidentTableData,
}: {
  incidentTableData: incidentTableDataProps[] | null;
}) {
  //   const [incidentTableData, setIncidentTableData] = useState<
  //     incidentTableDataProps[] | null
  //   >(null);
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     const getIncidentData = async () => {
  //       //   setIsLoading(true);
  //       const { data, error } = await supabase
  //         .from("incidents")
  //         .select("incident_severity");
  //       //   setIsLoading(false);
  //       if (error) {
  //         throw new Error(error.message);
  //       }
  //       setIncidentTableData(data);
  //     };
  //     getIncidentData();
  //   }, []);

  //   if (isLoading) {
  //     return (
  //       <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
  //     );
  //   }
  console.log(incidentTableData);
  const resolved = incidentTableData?.filter(
    (inc) => inc.incident_severity.toUpperCase() === "RESOLVED",
  ).length;
  const critical = incidentTableData?.filter(
    (inc) => inc.incident_severity.toUpperCase() === "CRITICAL",
  ).length;
  const moderate = incidentTableData?.filter(
    (inc) => inc.incident_severity.toUpperCase() === "MODERATE",
  ).length;
  const low = incidentTableData?.filter(
    (inc) => inc.incident_severity.toUpperCase() === "LOW",
  ).length;

  return (
    <div className="flex flex-col gap-8 px-4 py-6 bg-base-raised w-[250px] border-r border-r-border  ">
      <div className="flex flex-col gap-">
        <h3 className="text-text-secondary uppercase text-[10px] font-mono tracking-wide">
          Incident Queue
        </h3>
        <div className="flex flex-col gap-2 text-xs mt-2">
          <div className="flex justify-between items-center bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-resolved">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-resolved rounded-full"></p>
              <p className="text-resolved font-mono text-xs font-extralight  py-1 rounded-md">
                RESOLVED
              </p>
            </div>
            <p className="text-resolved bg-resolved-muted px-2 rounded-md">
              {resolved}
            </p>
          </div>
          <div className="flex justify-between items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-critical ">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-critical rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs   py-1 rounded-md">
                CRITICAL
              </p>
            </div>
            <p className="text-critical bg-critical-muted px-2 rounded-md">
              {critical}
            </p>
          </div>
          <div className="flex justify-between items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-moderate ">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-moderate rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs   py-1 rounded-md">
                MODERATE
              </p>
            </div>
            <p className="text-moderate bg-moderate-muted px-2 rounded-md">
              {moderate}
            </p>
          </div>
          <div className="flex justify-between items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-1 border-l-2 border-l-accent">
            <div className="flex items-center gap-3">
              <p className="h-1.5 w-1.5 bg-accent rounded-full"></p>
              <p className="text-text-secondary font-mono text-xs   py-1 rounded-md">
                LOW
              </p>
            </div>
            <p className="text-accent bg-resolved-muted px-2 rounded-md">
              {low}
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
