import express from "express";
import UserModel from "../Model/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userrecord = await UserModel.create(req.body);
    res.status(200).json({ status: 200, message: "Data added successfully", data: userrecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(200).json({ status: 200, message: "Data updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/sign-out ", async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.body._id);
    res.status(200).json({ status: 200, message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
