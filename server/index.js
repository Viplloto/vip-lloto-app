import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/matches", (req, res) => {
  res.json([
    {
      id: 1,
      teams: "Manchester City - Arsenal",
      time: "Sot, 20:00",
      odds: [
        { result: "1", value: 1.95 },
        { result: "X", value: 3.40 },
        { result: "2", value: 3.80 }
      ]
    },
    {
      id: 2,
      teams: "Liverpool - Chelsea",
      time: "Sot, 21:00",
      odds: [
        { result: "1", value: 1.70 },
        { result: "X", value: 3.75 },
        { result: "2", value: 4.60 }
      ]
    }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});