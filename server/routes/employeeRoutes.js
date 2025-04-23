import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import Employee from "../models/Employee.js";
import Task from "../models/Task.js";

const router = express.Router();

const checkAndCreateUploadsFolder = () => {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }
};
checkAndCreateUploadsFolder();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ---------- GET ALL EMPLOYEES ---------- */
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------- GET EMPLOYEE BY ID ---------- */
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }

    const employee = await Employee.findById(req.params.id)
      .populate("tasksAssigned")
      .exec();

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------- ADD NEW EMPLOYEE ---------- */

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      type,
      salary,
      joined,
      years,
      address,
      phoneNumber,
      tasksAssigned,
    } = req.body;

    const parsedTasks = tasksAssigned ? JSON.parse(tasksAssigned) : [];

    const photoPath = req.file ? `uploads/${req.file.filename}` : null;

    const newEmployee = new Employee({
      name,
      email,
      role,
      type,
      salary,
      joined,
      years,
      address,
      phoneNumber,
      photo: photoPath,
      tasksAssigned: parsedTasks,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(500).json({ error: "Failed to save employee" });
  }
});

/* ---------- UPDATE EMPLOYEE ---------- */
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (req.file) {
      if (employee.photo && fs.existsSync(employee.photo)) {
        fs.unlinkSync(employee.photo);
      }
      employee.photo = `uploads/${req.file.filename}`;
    }

    const fieldsToUpdate = [
      "name",
      "email",
      "role",
      "type",
      "salary",
      "joined",
      "years",
      "address",
      "phoneNumber",
      "status",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        employee[field] = req.body[field];
      }
    });

    if (req.body.tasksAssigned) {
      employee.tasksAssigned = JSON.parse(req.body.tasksAssigned);
    }

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ---------- DELETE EMPLOYEE ---------- */
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------- ASSIGN TASK TO EMPLOYEE ---------- */
router.post("/:employeeId/assign-task", async (req, res) => {
  try {
    const { title, description, startDate, endDate, status, team, reporter } =
      req.body;

    const task = new Task({
      title,
      description,
      status,
      assignee: req.params.employeeId,
      startDate,
      endDate,
      team,
      reporter,
    });

    await task.save();

    const employee = await Employee.findById(req.params.employeeId);
    employee.tasksAssigned.push(task._id);
    await employee.save();

    res.json(task);
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
