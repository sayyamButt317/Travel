import express from "express";
import { pool } from "../Config/db.js"; // Assuming this is your MySQL connection pool
import bcrypt from "bcrypt";

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


// Login user (authenticate with email and password)
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Query the database to find the user by email
    const [users] = await pool.query("SELECT * FROM User WHERE Email = ?", [
      Email,
    ]);

    // Check if the user exists
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0]; // Get the first user record

    // Compare the provided password with the stored password
    if (user.Password !== Password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return success response
    res.status(200).json({ message: "Login successful", userId: user.UserID });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/sign-up", async (req, res) => {
  const { username, password, email, registrationDate } = req.body; // Make sure to match these keys with frontend

  // Check if any required fields are missing
  if (!username || !password || !email || !registrationDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Insert user data into the database
    const [result] = await pool.query(
      "INSERT INTO User (UserName, Password, Email, RegistrationDate) VALUES (?, ?, ?, ?)",
      [username, password, email, registrationDate]
    );

    res.status(200).json({
      status: 200,
      message: "User added successfully",
      data: {
        UserID: result.insertId,
        UserName: username,
        Email: email,
        RegistrationDate: registrationDate,
      },
    });
  } catch (err) {
    console.error("Error during sign-up:", err.message);
    res.status(500).json({ message: err.message });
  }
});


router.post("/add-locations", async (req, res) => {
  const { LocationName, Description, CityName, Country } = req.body;

  // Validate inputs
  if (!LocationName || !Description || !CityName || !Country) {
    return res.status(400).json({ message: "Location name, description, city name, and country are required" });
  }

  try {
    // Check if the city already exists in the City table
    let [city] = await pool.query("SELECT CityID FROM City WHERE CityName = ? AND Country = ?", [CityName, Country]);

    if (city.length === 0) {
      // If the city does not exist, insert it into the City table
      const [result] = await pool.query(
        "INSERT INTO City (CityName, Country) VALUES (?, ?)",
        [CityName, Country]
      );
      city = [{ CityID: result.insertId }];
    }

    // Insert the location with the correct CityID
    const cityID = city[0].CityID;
    await pool.query(
      "INSERT INTO Location (LocationName, Description, CityID) VALUES (?, ?, ?)",
      [LocationName, Description, cityID]
    );

    // Send a success response if the insert is successful
    res.status(200).json({ message: "Location successfully added" });
  } catch (error) {
    console.error("Error during data insertion:", error.message);
    // Send error details to the client
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



// Delete a user (sign-out)
router.post("/sign-out", async (req, res) => {
  const { UserID } = req.body;

  try {
    const [result] = await pool.query("DELETE FROM User WHERE UserID = ?", [
      UserID,
    ]);

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ status: 200, message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
