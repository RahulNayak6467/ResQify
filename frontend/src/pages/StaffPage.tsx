import IncidentFeedLayout from "../components/staff/incidentQueue/IncidentFeedLayout";

import RightBarLayout from "../components/staff/rightbar/rightbarLayout";
import Sidebar from "../components/staff/sidebar/Sidebar";
import StaffTopbar from "../components/staff/staffnavbar";

function StaffPage() {
  return (
    <main className="min-h-screen">
      <StaffTopbar />
      <div className="grid grid-cols-[250px_1fr_300px] ">
        <Sidebar />
        <IncidentFeedLayout />
        <RightBarLayout />
      </div>
    </main>
  );
}

export default StaffPage;
