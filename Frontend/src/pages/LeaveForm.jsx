import React, { useState } from "react";
import axios from "axios";
import styles from '../components/Dashboard/AdminDashboard/Dasboard.module.css'

function LeaveForm() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    comments: "",
    attachment: null,
  });

  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, attachment: file });
    setFilePreview(file ? file.name : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formDataObj = new FormData();
    formDataObj.append("fromDate", formData.fromDate);
    formDataObj.append("toDate", formData.toDate);
    formDataObj.append("leaveType", formData.leaveType);
    formDataObj.append("comments", formData.comments);
    if (formData.attachment) {
      formDataObj.append("attachment", formData.attachment);
    }

    try {
      await axios.post("http://localhost:4000/api/leave", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Leave request submitted successfully!");

      // Reset Form
      setFormData({ fromDate: "", toDate: "", leaveType: "", comments: "", attachment: null });
      setFilePreview(null);
      e.target.reset(); // Reset file input visually
    } catch (error) {
      setErrorMessage("Failed to submit leave request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`card mb-4 ${styles.userTable}  max-h-[97.3vh] overflow-auto`} style={{width:"100%"}}>
                      <div className="card-header  ">
                        <i className="fas fa-table me-1"></i>
                        Leave Form
                      </div>
            
    <div className="card-body">
    <div className="flex">
  
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 ">
        <h2 className="text-3xl font-semibold text-center mb-6">Leave Request</h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Leave From Date */}
          <div>
            <label className="block text-gray-700 font-medium">Leave From:</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Leave To Date */}
          <div>
            <label className="block text-gray-700 font-medium">Leave To:</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Leave Type Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Type of Leave:</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Paid Leave">Paid Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>

          {/* File Upload for Attachments */}
          <div>
            <label className="block text-gray-700 font-medium">Attachments (Optional):</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {filePreview && <p className="text-gray-600 mt-2">Selected File: {filePreview}</p>}
          </div>

          {/* Comments */}
          <div>
            <label className="block text-gray-700 font-medium">Comments (Optional):</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter comments..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-sm py-3 rounded-lg transition duration-200 ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Leave Request"}
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
}

export default LeaveForm;
