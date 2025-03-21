import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../components/Dashboard/AdminDashboard/Dasboard.module.css'



function AttendanceOption() {
  const navigate = useNavigate();

  return (
     <div className={`card mb-4 ${styles.userTable}`} style={{width:"100%"}}>
              <div className="card-header  ">
                <i className="fas fa-table me-1"></i>
                Attendance & Leave Form
              </div>
    
    <div className="card-body">
    <div className="flex">
        <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Attendance Tracking</h1>
        <p className="text-gray-600 mt-2">Track employee attendance here.</p>
        
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate("/calenderpage")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Mark Attendance
          </button>
          <button
            onClick={() => navigate("/leaveform")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Mark Leave
          </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default AttendanceOption;
