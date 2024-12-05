import express from "express";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// MySQL Connection Pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check MySQL Connection
const CheckConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database Connection Successful ✔");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    throw error;
  }
};

export { pool, CheckConnection };
