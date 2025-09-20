import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();   // ✅ create app before using it
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
