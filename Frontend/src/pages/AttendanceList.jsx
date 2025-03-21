import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
//import styles from '../components/Dashboard/AdminDashboard/Dashboard.module.css'
import styles from '../components/Dashboard/AdminDashboard/Dasboard.module.css'
function AttendanceList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/attendance")
      .then((response) => setRecords(response.data))
      .catch((error) => console.error("Error fetching records", error));
  }, []);

  // Count occurrences of each status
  const statusCounts = records.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  // Convert data to Pie Chart format
  const pieData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // Green, Yellow, Red

  return (
     <div className={`card mb-4 ${styles.userTable}`} style={{width:"100%"}}>
      <div className="card-header  ">
            <i className="fas fa-table me-1"></i>
            Attendance Form
          </div>
          <div className="card-body">    
    <div className="flex">
    
      
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Attendance Records</h2>

        {records.length === 0 ? (
          <p className="text-center text-gray-500">No attendance records found.</p>
        ) : (
          <>
            {/* Attendance Table */}
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-2 border border-gray-300">Task Name</th>
                  <th className="p-2 border border-gray-300">Task Owner</th>
                  <th className="p-2 border border-gray-300">Hours</th>
                  <th className="p-2 border border-gray-300">Status</th>
                  <th className="p-2 border border-gray-300">Comments</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="p-2 border border-gray-300">{record.taskName}</td>
                    <td className="p-2 border border-gray-300">{record.assignedBy}</td>
                    <td className="p-2 border border-gray-300">{record.workingHours}</td>
                    <td className="p-2 border border-gray-300">{record.status}</td>
                    <td className="p-2 border border-gray-300">{record.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pie Chart */}
            <div className="flex justify-center">
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
    </div>
  );
}

export default AttendanceList;
