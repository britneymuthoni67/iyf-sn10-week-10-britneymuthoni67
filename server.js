const express = require("express");
const app = express();

const postsRoutes = require("./data/middleware/routes/posts");
const logger = require("./data/middleware/logger");

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/posts", postsRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("CommunityHub API is running...");
});

// User Route
app.get("/me", (req, res) => {
  res.json({
    username: "britneymuthoni"
  });
});

// Error Handling Middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});