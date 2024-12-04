import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const CheckConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database Connection Successful ✔");
    connection.release();
    return connection;
  } catch (error) {
    console.log("Database Connection Failed ");
    throw error
  }
};

export {pool, CheckConnection};