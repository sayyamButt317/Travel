import dotenv from "dotenv";
import { app } from "./App.js";
import { connectionDB } from "./db/connection.js";

// Environment variable configuration
dotenv.config(); // Loads environment variables from `.env` by default

// Connect to MongoDB and Start Server
connectionDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit the process if the DB connection fails
  });
