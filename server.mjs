import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// 🧭 Resolve __dirname in ES module format
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Enable CORS (optional but safe)
app.use(cors());

// ✅ Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Handle root URL (so "/" shows index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
