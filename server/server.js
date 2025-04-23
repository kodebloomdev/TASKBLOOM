import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/upload", uploadRoutes); 

// DB Connection
mongoose
  .connect("mongodb://localhost:27017/Employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server start
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
