import cors from "cors";
import express from "express";
import { mockData } from "./mockDb.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })).get("/data", (req, res) => {
  console.log("Request received.");
  // res.setHeader("Content-Type", "application/json");
  res.json(mockData);
});

const PORT = 3000;
app.listen(PORT);
console.log(`Server listening on port ${PORT}...`);
