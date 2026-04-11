import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import classifyRoute from "./src/routes/classify.routes.js";

dotenv.config();

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api", classifyRoute);
app.post("/test", (req, res) => {
  res.json({ message: "direct route working" });
});
// app.get("/", (req, res) => {
//   console.log("Hello");
//   return res.json({ message: "ResQify backend is runnig" });
// });

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
