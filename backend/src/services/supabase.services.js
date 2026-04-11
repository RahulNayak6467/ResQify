import { supabase } from "../lib/supabase.js";

export const insertAiClassification = async (data) => {
  const { data: aiData, error } = await supabase
    .from("aiclassification")
    .insert({ ...data, incident_id: process.env.Incident_ID })
    .single();
  if (error) {
    console.log(error.message);
    console.log("Not inserted in Database");
    return;
  }
  console.log(aiData);
  console.log("Inserted in Databse");
};

export const insertIncidents = async () => {
  const { data, error } = await supabase
    .from("incidents")
    .insert({
      room_number: 1,
      user_name: "jaya",
      user_query: "water is not coming",
      INC_code: "ekebfjif",
      team_status: "deployed",
      resolved_at: null,
      guest_id: process.env.ID,
      assigned_to: null,
      current_status: "resolved",
      escalated: false,
      incident_severity: "moderate",
    })
    .select()
    .single();
  if (error) {
    console.log(error.message);
    console.log("Not inserted in Database");
    return;
  }

  console.log("Inserted in DB");
};
