import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    taskName: { type: String, required: true },
    assignedBy: { type: String, required: true },
    workingHours: { type: Number, required: true },
    status: { type: String, enum: ["Completed", "In Progress", "Pending"], required: true },

    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("attendances", attendanceSchema);
export default Attendance;
