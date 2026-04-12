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
  //   console.log("guest_id", userData?.guest_id?.id);
  const { data, error } = await supabase
    .from("incidents")
    .insert({
      room_number: userData.roomNumber,
      user_name: userData?.name,
      user_query: userData.description,
      INC_code: `INC_Code-${INC_code}`,
      team_status: "online",
      resolved_at: null,
      guest_id: userData?.guest_id?.id,
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
