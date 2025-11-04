import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Add this route
app.get("/api/standings", async (req, res) => {
  try {
    const standings = [
      { team: "49ers", logo: "...", wins: 6, losses: 2, ties: 0, winPercent: 0.75, pointsFor: 210, pointsAgainst: 150 },
      // add more if you want
    ];
    res.json(standings);
  } catch (err) {
    res.status(500).json({ error: "Failed to load standings" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
