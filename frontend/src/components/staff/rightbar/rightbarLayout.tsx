import { useEffect, useRef, useState } from "react";
import { useStaff } from "../../../context/staffContext";
import { supabase } from "../../../lib/supabaseclient";
import Analysis from "./aianalysis";
import IncidentDetail from "./incidentdetail";
import IncidentTimeline from "./timelinevent";
import { useAuthContext } from "../../../context/AuthProvider";

function RightBarLayout() {
  const [, setIsClicked] = useState(false);
  const [approveUpdate, setApprovdeUpdate] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { user } = useAuthContext();

  const toTimestamptz = (date = new Date()) => {
    return date.toISOString();
  };
  const { selectedIncident, setSelectedIncident, setIncident } = useStaff();
  console.log(selectedIncident);
  const resolveUpdateIncident = async (id: string, user_id: string) => {
    if (selectedIncident.incident_severity === "resolved") return;
    setIsResolving(true);
    try {
      const { data, error: incidentError } = await supabase
        .from("incidents")
        .update({ incident_severity: "resolved", resolved_at: toTimestamptz() })
        .eq("id", id)
        .select();
      const { data: updatedData, error } = await supabase
        .from("profiles")
        .update({ staff_status: "online" })
        .eq("id", user_id)
        .select();
      if (incidentError) throw new Error(incidentError.message);
      if (error) throw new Error(error.message);

      const secondsTaken = Math.floor(
        (new Date().getTime() -
          new Date(selectedIncident?.created_at).getTime()) /
          1000,
      );
      await supabase.rpc("update_avg_response", {
        staff_id: user_id,
        response_seconds: secondsTaken,
      });
      await supabase.rpc("increment_resolved", { staff_id: user_id });

      const updated = { ...selectedIncident, incident_severity: "resolved" };
      setSelectedIncident(updated);
      setIncident((prev) => prev.map((inc) => (inc.id === id ? updated : inc)));
      console.log(updatedData, data);
    } finally {
      setIsResolving(false);
    }
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
  //   if (!selectedIncident) return;
  //   useEffect(() => {
  //       const fetchApprove = async () => {
  //           if (isClicked) {

  //         }
  //         const dataApprove = await updateApproved(selectedIncident?.id);

  //     };
  //   });
  console.log(approveUpdate);
  console.log("USERID", user);

  const selectedIncidentRef = useRef(selectedIncident);

  useEffect(() => {
    selectedIncidentRef.current = selectedIncident;
  }, [selectedIncident]);

  useEffect(() => {
    const channel = supabase
      .channel("incidentevents")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "incidentevents",
        },
        () => {
          checkApproved(selectedIncidentRef.current?.id);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [approveUpdate]);
  if (!selectedIncident) return;
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
          disabled={
            selectedIncident?.incident_severity === "resolved" || isResolving
          }
          style={{
            opacity:
              selectedIncident?.incident_severity === "resolved" || isResolving
                ? 0.2
                : 1,
          }}
          onClick={() =>
            resolveUpdateIncident(selectedIncident?.id, user ?? user.id)
          }
          className="uppercase text-resolved text-[12px] py-2 w-[95%] mx-auto bg-resolved-muted border border-resolved-border rounded-md cursor-pointer hover:brightness-125 transition-all"
        >
          {isResolving
            ? "Resolving..."
            : selectedIncident?.incident_severity === "resolved"
              ? "Resolved"
              : "Mark Resolved"}
        </button>
        <button
          onClick={async () => {
            setIsClicked(() => true);
            setIsApproving(true);
            try {
              const data = await updateApproved(selectedIncident?.id);
              setApprovdeUpdate(data?.[0]?.approved_time ?? toTimestamptz());
              await updateStaffStatus(user.id ?? user);
            } finally {
              setIsApproving(false);
            }
          }}
          type="button"
          disabled={!!approveUpdate || isApproving}
          style={{
            opacity: approveUpdate || isApproving ? 0.2 : 1,
          }}
          className="uppercase text-accent text-[12px] py-2 w-[95%] mx-auto bg-accent-muted border border-accent-border rounded-md hover:brightness-125 transition-all cursor-pointer"
        >
          {isApproving
            ? "Approving..."
            : approveUpdate
              ? "Approved"
              : "Approve"}
        </button>
      </div>
    </div>
  );
}

export default RightBarLayout;
