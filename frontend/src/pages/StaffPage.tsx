import { useEffect, useState } from "react";
import IncidentFeedLayout from "../components/staff/incidentQueue/IncidentFeedLayout";

import RightBarLayout from "../components/staff/rightbar/rightbarLayout";
import Sidebar from "../components/staff/sidebar/Sidebar";
import StaffTopbar from "../components/staff/staffnavbar";
import Loader from "../components/ui/Loader";

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
      <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
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
