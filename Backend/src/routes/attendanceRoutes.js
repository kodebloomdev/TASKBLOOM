import express from "express";
import Attendance from "../models/Attendance.js";


const router = express.Router();

// ✅ Add Attendance
router.post("/", async (req, res) => {
  try {
    const { taskName, assignedBy, workingHours, status, comments } = req.body;

    // Validate Required Fields
    if (!taskName || !assignedBy || !workingHours || !status) {
      return res.status(400).json({ message: "All fields are required except comments" });
    }

    // Create New Attendance Record
    const attendance = new Attendance({ taskName, assignedBy, workingHours, status, comments });
    await attendance.save();

    res.status(201).json({ 
      message: "Attendance recorded successfully", 
      attendance 
    });
  } catch (error) {
    console.error("Error saving attendance:", error.message);
    res.status(500).json({ message: "Error saving attendance", error: error.message });
  }
});

// ✅ Get All Attendance Records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error.message);
    res.status(500).json({ message: "Error fetching records", error: error.message });
  }
});

export default router;
