import { useEffect, useState } from "react";
import IncidentFeedLayout from "../components/staff/incidentQueue/IncidentFeedLayout";

import RightBarLayout from "../components/staff/rightbar/rightbarLayout";
import Sidebar from "../components/staff/sidebar/Sidebar";
import StaffTopbar from "../components/staff/staffnavbar";

import { useStaff } from "../context/staffContext";
import { supabase } from "../lib/supabaseclient";

interface incidentTableDataProps {
  incident_severity: string;
}

function StaffPage() {
  //   const [incidentCategory, setIncidentCategory] = useState("All");
  //   const handleCategory = (category: string) => {
  //     setIncidentCategory(category);
  //   };

  const [incidentTableData, setIncidentTableData] = useState<
    incidentTableDataProps[] | null
  >(null);
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getIncidentData = async () => {
      //   setIsLoading(true);
      const { data, error } = await supabase
        .from("incidents")
        .select("incident_severity");
      //   setIsLoading(false);
      if (error) {
        throw new Error(error.message);
      }
      setIncidentTableData(data);
    };
    getIncidentData();
  }, []);

  const { isLoading } = useStaff();

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-hidden bg-base">
        {/* Topbar skeleton */}
        <div className="h-[50px] border-b border-border bg-surface flex items-center px-6 gap-4">
          <div className="w-24 h-3 bg-surface-raised rounded animate-pulse" />
          <div className="flex-1" />
          <div className="w-20 h-3 bg-surface-raised rounded animate-pulse" />
          <div className="w-8 h-8 bg-surface-raised rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-[250px_1fr_300px]">
          {/* Sidebar skeleton */}
          <div className="border-r border-border bg-surface min-h-[calc(100vh-50px)] p-4 flex flex-col gap-3">
            <div className="w-full h-8 bg-surface-raised rounded-lg animate-pulse mb-2" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2">
                <div className="w-2 h-2 rounded-full bg-surface-raised animate-pulse shrink-0" />
                <div className="flex-1 h-3 bg-surface-raised rounded animate-pulse" />
                <div className="w-6 h-3 bg-surface-raised rounded animate-pulse" />
              </div>
            ))}
            <div className="mt-4 w-full h-px bg-border" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2">
                <div className="w-2 h-2 rounded-full bg-surface-raised animate-pulse shrink-0" />
                <div className="flex-1 h-3 bg-surface-raised rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Incident feed skeleton */}
          <div className="border-r border-border bg-base min-h-[calc(100vh-50px)] p-4 flex flex-col gap-3">
            <div className="w-40 h-3 bg-surface-raised rounded animate-pulse mb-2" />
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="border border-border rounded-xl p-4 bg-surface flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-3 bg-surface-raised rounded animate-pulse" />
                  <div className="w-20 h-3 bg-surface-raised rounded animate-pulse" />
                  <div className="flex-1" />
                  <div className="w-12 h-5 bg-surface-raised rounded animate-pulse" />
                </div>
                <div className="w-3/4 h-3 bg-surface-raised rounded animate-pulse" />
                <div className="w-1/2 h-3 bg-surface-raised rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Right panel skeleton */}
          <div className="bg-surface min-h-[calc(100vh-50px)] p-4 flex flex-col gap-4">
            <div className="w-32 h-3 bg-surface-raised rounded animate-pulse" />
            <div className="w-full h-24 bg-surface-raised rounded-xl animate-pulse" />
            <div className="w-full h-px bg-border" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-surface-raised animate-pulse mt-1 shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="w-full h-3 bg-surface-raised rounded animate-pulse" />
                  <div className="w-2/3 h-3 bg-surface-raised rounded animate-pulse" />
                </div>
              </div>
            ))}
            <div className="mt-auto flex gap-2">
              <div className="flex-1 h-9 bg-surface-raised rounded-lg animate-pulse" />
              <div className="flex-1 h-9 bg-surface-raised rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <StaffTopbar incidentTableData={incidentTableData} />
      <div className="grid grid-cols-[250px_1fr_300px] ">
        <Sidebar incidentTableData={incidentTableData} />
        <IncidentFeedLayout />
        <RightBarLayout />
      </div>
    </main>
  );
}

export default StaffPage;
