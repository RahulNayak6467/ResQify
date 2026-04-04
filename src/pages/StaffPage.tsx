import IncidentFeedLayout from "../components/staff/incidentQueue/IncidentFeedLayout";
import IncidentFeedHeader from "../components/staff/incidentQueue/topbar";
import Sidebar from "../components/staff/sidebar/Sidebar";
import StaffTopbar from "../components/staff/staffnavbar";

function StaffPage() {
  return (
    <main>
      <StaffTopbar />
      <div className="grid grid-cols-[250px_1fr_250px]">
        <Sidebar />
        <IncidentFeedLayout />
      </div>
    </main>
  );
}

export default StaffPage;
