const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Netlify Functions & Express!" });
});

// TODO: Import and use your routes/controllers for auth, challenges, admin, etc.
// Example: app.use("/challenges", require("./challenges"));

// Export the handler
module.exports.handler = serverless(app);