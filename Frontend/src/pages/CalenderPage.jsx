import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from '../components/Dashboard/AdminDashboard/Dasboard.module.css'

function CalendarPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date click
  const handleDateClick = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      navigate("/attendanceform"); // Redirect to attendance form
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
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Attendance Calendar</h1>
        <p className="text-gray-600 mb-6">Click on today's date to mark attendance.</p>

        {/* Centered Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Calendar
            onClickDay={handleDateClick} // Handle date click
            value={selectedDate}
            tileClassName={({ date }) => {
              const today = new Date();
              if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
              ) {
                return "bg-blue-500 text-white font-bold rounded-lg"; // Highlight current date
              }
              if (date.getDay() === 0 || date.getDay() === 6) {
                return "text-red-500"; // Mark Saturdays and Sundays in red
              }
            }}
          />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default CalendarPage;
