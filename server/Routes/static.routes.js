import express from "express";
import { pool } from "../Config/db.js"; // Assuming this is your MySQL connection pool
import bcrypt from 'bcrypt';

const router = express.Router();

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM User");
    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/sign-up", async (req, res) => {
  const { UserName, Password, Email, RegistrationDate } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO User (UserName, Password, Email, RegistrationDate) VALUES (?, ?, ?, ?)",
      [UserName, Password, Email, RegistrationDate]
    );
    
    res.status(200).json({
      status: 200,
      message: "User added successfully",
      data: { UserID: result.insertId, UserName, Email, RegistrationDate },
    });
  } catch (err) {
    console.error("Error during sign-up:", err.message);
    res.status(500).json({ message: err.message });
  }
});


// Login user (authenticate with email and password)
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Query the database to find the user by email
    const [user] = await pool.query("SELECT * FROM User WHERE Email = ?", [Email]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user[0].Password !== Password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        UserID: user[0].UserID,
        UserName: user[0].UserName,
        Email: user[0].Email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user (sign-out)
router.post("/sign-out", async (req, res) => {
  const { UserID } = req.body;

  try {
    const [result] = await pool.query("DELETE FROM User WHERE UserID = ?", [UserID]);

    if (result.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
