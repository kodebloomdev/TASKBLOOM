import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from '../components/Dashboard/AdminDashboard/Dasboard.module.css'

function AttendanceForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskName: "",
    assignedBy: "",
    workingHours: "",
    status: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/attendance", formData);
      alert("Attendance recorded successfully!");
      setFormData({
        taskName: "",
        assignedBy: "",
        workingHours: "",
        status: "",
        comments: "",
      });
      navigate("/attendancelist");
    } catch (error) {
      alert("Error submitting attendance");
    }
  };

  return (
    <div className={`card mb-4 ${styles.userTable}`} style={{width:"100%"}}>
                  <div className="card-header  ">
                    <i className="fas fa-table me-1"></i>
                    Attendance Form
                  </div>
        
        <div className="card-body">
    <div className="flex">
  
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Name */}
        <input
          type="text"
          name="taskName"
          placeholder="Assigned Task Name"
          value={formData.taskName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        {/* Assigned By */}
        <input
          type="text"
          name="assignedBy"
          placeholder="Task Assigned By"
          value={formData.assignedBy}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Working Hours */}
        <input
          type="number"
          name="workingHours"
          placeholder="Working Hours"
          value={formData.workingHours}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Comments */}
        <textarea
          name="comments"
          placeholder="Comments (if any)"
          value={formData.comments}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full max-w-xs bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default AttendanceForm;
