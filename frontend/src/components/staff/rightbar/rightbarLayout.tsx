import { useEffect, useState } from "react";
import { useStaff } from "../../../context/staffContext";
import { supabase } from "../../../lib/supabaseclient";
import Analysis from "./aianalysis";
import IncidentDetail from "./incidentdetail";
import IncidentTimeline from "./timelinevent";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthContext } from "../../../context/AuthProvider";

function RightBarLayout() {
  const [isClicked, setIsClicked] = useState(false);
  const [approveUpdate, setApprovdeUpdate] = useState("");
  const { user } = useAuthContext();

  const toTimestamptz = (date = new Date()) => {
    return date.toISOString();
  };
  const { selectedIncident } = useStaff();
  console.log(selectedIncident);
  const resolveUpdateIncident = async (id: string, user_id: string) => {
    if (selectedIncident.incident_severity === "resolved") {
      return;
    }
    const { data, error: incidentError } = await supabase
      .from("incidents")
      .update({ incident_severity: "resolved", resolved_at: toTimestamptz() })
      .eq("id", id)
      .select();
    console.log("userID", user_id);
    const { data: updatedData, error } = await supabase
      .from("profiles")
      .update({ staff_status: "online" })
      .eq("id", user_id)
      .select();
    if (incidentError) {
      throw new Error(incidentError.message);
    }
    console.log(updatedData);
    console.log("ResolvedData: ", data);
  };
  const updateApproved = async (id: string) => {
    const { data, error } = await supabase
      .from("incidentevents")
      .update({ approved_time: toTimestamptz() })
      .eq("incident_id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
    console.log("ApprovedData: ", data);
  };
  const checkApproved = async (id: string) => {
    const { data, error } = await supabase
      .from("incidentevents")
      .select("*")
      .eq("incident_id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const updateStaffStatus = async (id: string) => {
    console.log("ID", id);
    const { data, error } = await supabase
      .from("profiles")
      .update({ staff_status: "deployed" })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const getData = await checkApproved(selectedIncident?.id);
      setApprovdeUpdate(getData[0]?.approved_time);
      console.log("GetData: ", getData);
    };
    fetchData();
  }, [selectedIncident]);
  //   if (isLoading) {
  //     return (
  //       <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
  //     );
  //   }
  if (!selectedIncident) return;
  //   useEffect(() => {
  //       const fetchApprove = async () => {
  //           if (isClicked) {

  //         }
  //         const dataApprove = await updateApproved(selectedIncident?.id);

  //     };
  //   });
  console.log(approveUpdate);
  console.log("USERID", user);
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
          disabled={selectedIncident?.incident_severity === "resolved"}
          style={{
            opacity:
              selectedIncident?.incident_severity === "resolved" ? 0.2 : 1,
          }}
          onClick={() =>
            resolveUpdateIncident(selectedIncident?.id, user.id ?? user)
          }
          className="uppercase text-resolved text-[12px] py-2 w-[95%] mx-auto bg-resolved-muted border border-resolved-border rounded-md cursor-pointer hover:brightness-125 transition-all"
        >
          {selectedIncident?.incident_severity === "resolved"
            ? "resolved"
            : "Mark Resolved"}
        </button>
        <button
          onClick={() => {
            setIsClicked(() => true);
            updateApproved(selectedIncident?.id);
            updateStaffStatus(user.id);
          }}
          type="button"
          disabled={approveUpdate ? true : false}
          style={{
            opacity: approveUpdate ? 0.2 : 1,
          }}
          className="uppercase text-accent text-[12px] py-2 w-[95%] mx-auto bg-accent-muted border border-accent-border rounded-md hover:brightness-125 transition-all cursor-pointer"
        >
          {approveUpdate ? "Approved" : "Approve"}
        </button>
      </div>
    </div>
  );
}

export default RightBarLayout;
