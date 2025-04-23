import mongoose from "mongoose";
import Task from "./Task.js"; 

const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  status: { type: String, enum: ["Active", "InActive"], default: "Active" },
  photo: String,
  salary: Number,
  joined: Date,
  years: Number,
  type: { type: String, enum: ["Intern", "Full-Time"] },
  address: String,
  phoneNumber: String,

  tasksAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task", 
    },
  ],
});

export default mongoose.model("Employee", employeeSchema);
