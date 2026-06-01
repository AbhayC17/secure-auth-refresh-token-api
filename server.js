require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = async () => {
  console.log("Shutting down gracefully...");

  server.close(async () => {
    console.log("HTTP server closed.");

    await mongoose.connection.close(false);
    console.log("MongoDB connection closed.");

    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  shutdown();
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  shutdown();
});