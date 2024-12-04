import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/static.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allowed origins for CORS
const allowedOrigins = process.env.PROD_CORS_ORIGINS?.split(",") || ["*"];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl)
      if (!origin) return callback(null, true);

      // Check against allowed origins
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON, URL-encoded data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use("/api/v1", userRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export { app };
