import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// Updated ESPN standings API
app.get("/api/standings", async (req, res) => {
  try {
    const response = await fetch("https://site.web.api.espn.com/apis/v2/sports/football/nfl/standings");
    const data = await response.json();

    const teams = [];

    // Parse ESPN standings structure (accurate as of 2025)
    data.children.forEach((conference) => {
      conference.standings.entries.forEach((entry) => {
        const team = entry.team;
        const stats = {};
        entry.stats.forEach((s) => (stats[s.name] = s.value));

        teams.push({
          team: team.displayName,
          logo: team.logos?.[0]?.href || "",
          wins: stats.wins || 0,
          losses: stats.losses || 0,
          ties: stats.ties || 0,
          winPercent: stats.winPercent || 0,
          pointsFor: stats.pointsFor || 0,
          pointsAgainst: stats.pointsAgainst || 0,
        });
      });
    });

    res.json(teams);
  } catch (err) {
    console.error("Error fetching standings:", err);
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

