import express from "express";
import userRouter from "./Routes/static.routes.js";
import  createAllTable  from './Utils/dbUtils.js';
import { CheckConnection } from "./Config/db.js";
import cors from 'cors'
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors());
// API Routes
app.use("/api", userRouter);

// Connect & Start Server
CheckConnection()
  .then(() => {
    app.listen(PORT, async () => {
      try {
        await createAllTable();
        console.log(`Server running on port ${PORT}`);
      } catch (err) {
        console.error("Error initializing database tables:", err.message);
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  });