import React from 'react';
import styles from './Dasboard.module.css';

import CircleProgressBar from './CircleProgressBar';
import TaskDashboard from './TaskDashboard';
import UserDataChart from '../UserDashboard/UserDataChart';

function Dashboard() {
  return (
    
    <div className={`container-fluid ${styles.dashboard} overflow-hidden w-100`} style={{ maxHeight: "100vh" }}>
      {/* Charts Section */}
      <div className="row px-4">
        
        {/* Task Progress Bar Section */}
        <div className="col-md-6">
          <div className={`card mb-4 h-[65vh] shadow-lg rounded-lg ${styles.chartCard}`}>
            <div className="card-header bg-white p-3 border-b">
              <i className="fas fa-chart-area me-1"></i> Task Progress Bar
            </div>
            <div className="card-body p-4">
              <TaskDashboard />
            </div>
          </div>
        </div>

        {/* User Data Chart & Circle Progress Bar Section */}
        <div className="col-md-6">
          <div className={`card mb-4 h-[65vh] shadow-lg rounded-lg ${styles.chartCard}`}>
            <div className="card-header bg-white text-dark p-3 border-b">
              <i className="fas fa-chart-area me-1"></i> User Progress Bar
            </div>
            <div className="card-body flex flex-col md:flex-row gap-4 p-4 bg-white">
              {/* Ensure space is allocated for charts */}
              <div className="w-full md:w-1/2 flex justify-center min-h-[200px]">
                <UserDataChart />
              </div>
              <div className="w-full md:w-1/2 flex justify-center min-h-[200px]">
                <CircleProgressBar />
              </div>
              
            </div>
          </div>
          
        </div>

      </div>  
    </div>
    
  );
}

export default Dashboard;
