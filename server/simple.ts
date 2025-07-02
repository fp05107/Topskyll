import express from "express";
import path from "path";

const app = express();
app.use(express.json());

// Basic API routes for talent categories
app.get("/api/talent-categories", (req, res) => {
  res.json([
    { id: 1, name: "Developers", slug: "developers", description: "Elite software developers" },
    { id: 2, name: "Designers", slug: "designers", description: "Top UX/UI designers" },
    { id: 3, name: "Finance Experts", slug: "finance", description: "Financial planning experts" },
    { id: 4, name: "Project Managers", slug: "managers", description: "Experienced project managers" },
    { id: 5, name: "Marketing Experts", slug: "marketing", description: "Growth marketing specialists" }
  ]);
});

// Serve static files
app.use(express.static("dist/public"));

// Catch-all handler
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist/public/index.html"));
});

const port = 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});