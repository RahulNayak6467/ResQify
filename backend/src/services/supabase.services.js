import { supabase } from "../lib/supabase.js";

export const insertAiClassification = async (data) => {
  const { data: incidentId, error: incidentError } = await supabase
    .from("incidents")
    .select("id");
  if (incidentError) {
    console.log(incidentError.message);
    return;
  }
  const incident_id = incidentId[incidentId.length - 1];
  //   console.log(incident_id);
  const { data: aiData, error } = await supabase
    .from("aiclassification")
    .insert({ ...data, incident_id: incident_id.id })
    .select()
    .single();
  if (error) {
    console.log(error.message);
    console.log("Not inserted in Database");
    return;
  }
  //   console.log(aiData);
  console.log("Inserted in Databse");
  return aiData;
};

export const insertIncidents = async (userData, aiResponse) => {
  const INC_code = Math.trunc(Math.random() * 10000 + 1);
  console.log("guest_id", userData?.guest_id);
  console.log("UserData: ", userData);
  const { data, error } = await supabase
    .from("incidents")
    .insert({
      room_number: userData.roomNumber,
      user_name: userData?.name,
      user_query: userData.description,
      INC_code: `INC_Code-${INC_code}`,
      team_status: "online",
      resolved_at: null,
      guest_id: userData?.guest_id.id ?? userData?.guest_id,
      assigned_to: null,
      current_status: "active",
      escalated: false,
      incident_severity: aiResponse.incident_severity,
    })
    .select()
    .single();
  if (error) {
    console.log(error.message);
    console.log("Not inserted in Database");
    return;
  }
  console.log("Inserted in DB");
  return data;
};

export const insertIncidentEvents = async (userData) => {
  const { data: incidentId, error: incidentError } = await supabase
    .from("incidents")
    .select("id");

  // userData?.guest_id.id ?? userData?.guest_id;
  if (incidentError) {
    console.log(incidentError.message);
    return;
  }

  const incident_id = incidentId[incidentId.length - 1].id;

  const { data: incidentGuestId, error: incidentErrorGuest } = await supabase
    .from("incidents")
    .select("guest_id");

  // userData?.guest_id.id ?? userData?.guest_id;
  if (incidentErrorGuest) {
    console.log(incidentError.message);
    return;
  }
  console.log(incidentGuestId);
  const profile_id = incidentGuestId[incidentGuestId.length - 1].guest_id;
  console.log(profile_id);
  const { data, error } = await supabase
    .from("incidentevents")
    .insert({
      incident_id,
      action: "ai_classified",
      profile_id,
      approved_time: null,
    })
    .select()
    .single();
  if (error) {
    console.log("Not inserted In IncidentEvents");
    throw new Error(error.message);
  }
  console.log("Inserted in Incident Events");
  return data;
};
