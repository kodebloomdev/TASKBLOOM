import express from "express";
import Task from "../models/Task.js";
const router = express.Router();

// Get a task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignee",
      "name"
    ); // Populate assignee with the user's name
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

// Add a comment
router.post("/:id/comments", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.comments.push({ user: req.body.user, text: req.body.text });
  await task.save();
  res.json(task);
});
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ message: "Failed to add task" });
  }
});

export default router;
