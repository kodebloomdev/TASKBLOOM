import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
    enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Unpaid Leave"],
  },
  comments: {
    type: String,
  },
  attachment: {
    type: String, // This will store the file path
  },
});

const Leave = mongoose.model("leave", leaveSchema);
export default Leave;


 
