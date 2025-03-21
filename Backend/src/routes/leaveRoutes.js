import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Leave from '../models/Leave.js'; // Ensure this file exists!

const router = express.Router();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Submit Leave Request
router.post("/", upload.single("attachment"), async (req, res) => {
  try {
    const { fromDate, toDate, leaveType, comments } = req.body;

    // Validate dates
    if (!fromDate || !toDate || isNaN(new Date(fromDate)) || isNaN(new Date(toDate))) {
      return res.status(400).json({ error: "Invalid dates provided" });
    }

    console.log("Uploaded file:", req.file);

    const newLeave = new Leave({
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      leaveType,
      comments,
      attachment: req.file ? req.file.path : null,
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting leave:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// Get All Leave Requests
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ error: "Error fetching leave requests" });
  }
});

export default router;
