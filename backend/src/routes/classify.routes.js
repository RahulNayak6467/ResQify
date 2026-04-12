import express from "express";
import getAIData from "../services/ai.services.js";
import {
  insertAiClassification,
  insertIncidents,
} from "../services/supabase.services.js";
console.log("classify routes loaded");
const router = express.Router();

router.post("/classify", async (req, res) => {
  console.log("Hello");
  console.log(req.body);
  const response = await getAIData(req.body.description);
  const aiResponse = await JSON.parse(response.aiResponse);
  const response_time = response.response_time;
  const aiResponseData = { ...aiResponse, response_time };

  console.log(aiResponseData);
  const incidentInfo = await insertIncidents(req.body, aiResponse);
  const aiClassificationInfo = await insertAiClassification(aiResponseData);

  console.log(incidentInfo);
  console.log();
  res.json({
    incidentInfo,
    aiClassificationInfo,
  });
});

export default router;
