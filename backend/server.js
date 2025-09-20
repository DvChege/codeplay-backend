// backend/server.js
import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(express.json());

// ===== Routes =====
app.use("/admin", adminRoutes);

// Health check / Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "✅ CodePlay Backend is running 🚀" });
});

// ===== Error Handling =====
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
