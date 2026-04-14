import { includes } from "zod";
import { supabase } from "./supabaseclient";
import { formatTime } from "./utils";

export const getResolvedTimeData = async (id: string) => {
  const { data, error } = await supabase
    .from("incidents")
    .select("resolved_at")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
  return data;
};

export const getApprovdedTimeData = async (id: string) => {
  const { data, error } = await supabase
    .from("incidentevents")
    .select("approved_time")
    .eq("incident_id", id);
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const getActiveIncidentData = async () => {
  const { data, error } = await supabase.from("incidents").select("*");
  if (error) {
    throw new Error(error.message);
  }
  const activeIncidents = data.filter(
    (inc) => inc.incident_severity !== "resolved",
  );
  return activeIncidents.length || 0;
};

export const getAIAccuracy = async () => {
  const { data, error } = await supabase
    .from("aiclassification")
    .select("ai_confidence");
  if (error) {
    throw new Error(error.message);
  }
  console.log("AI Confidence:", data);
  if (!data?.length) return 0;
  const dataAvg =
    data.reduce((acc, response) => acc + response.ai_confidence, 0) /
    data.length;
  return Math.round(Number(dataAvg));
};

export const getAILatency = async () => {
  const { data, error } = await supabase
    .from("aiclassification")
    .select("response_time");
  if (error) {
    throw new Error(error.message);
  }
  if (!data?.length) return 0;
  const dataAvg =
    data.reduce((acc, response) => acc + Number(response.response_time), 0) /
    data.length;
  return Number(dataAvg.toFixed(2));
};

export const getStaffOnline = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  // .select("*", { count: "exact", head: true })
  // .in("staff_status", ["online", "deployed"]);
  if (error) {
    throw new Error(error.message);
  }
  const staffData = data.filter(
    (staff) =>
      staff.staff_status === "online" || staff.staff_status === "deployed",
  );
  return staffData.length || 0;
};

export const getResolutionRate = async () => {
  const { data, error } = await supabase
    .from("incidents")
    .select("incident_severity");
  if (error) {
    throw new Error(error.message);
  }
  const resolvedData = data.filter(
    (inc) => inc.incident_severity === "resolved",
  );
  const percentageResolved = Math.round(
    (resolvedData.length * 100) / data.length,
  );
  return percentageResolved ?? 0;
};

export const getIncidentType = async () => {
  const { data, error } = await supabase.from("aiclassification").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};
