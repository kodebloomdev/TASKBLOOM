import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from '../pages/signin/Signin';
import Slider from '../components/slider/Slider';
import Register from '../pages/Users/Register';
import Dashboard from '../components/Dashboard/AdminDashboard/Dashboard';
import UserDashboard from '../components/Dashboard/UserDashboard/UserDashboard';
// import Signup from '../pages/signup/Signup';

import Home from '../pages/Users/Home';
import Edit from '../pages/Users/Edit';
import Details from '../pages/Users/Details';
import Task from '../pages/Task/Task';
import UserTask from '../pages/User Task/TaskPage'
import TaskSubmittingPage from '../pages/User Task/TaskSubmissionForm'
import SubmittedTaskPage from '../pages/Task/SubmittedTask'
import UserTasklistpage from '../pages/User Task/TaskList'
import AttendanceOption from '../pages/AttendOption';
import CalendarPage from '../pages/CalenderPage';
import LeaveForm from '../pages/LeaveForm';
import AttendanceForm from '../pages/AttendaceForm';
import AttendanceList from '../pages/AttendanceList';
import Header from '../pages/Header';
import Layout from '../pages/Layout';


function AppRouters() {
  return (
  <Routes>
   <Route element={<Layout />}>
    <Route
      path='/slider'
      element={
        <> <Slider/> </>
      }
    />

<Route
        path="/"
        element={
          <>
            <Signin />
          </>
        }
      />

<Route
        path="/home"
        element={
          <>
            <div className="d-flex">
               
              <Slider />
              
              <Home />
            </div>
          </>
        }
      />

    

<Route
        path="/register"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Register />
            </div>
          </>
        }
      />

<Route
        path="/edit/:id"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Edit />
            </div>
          </>
        }
      />

<Route
        path="/view/:id"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Details />
            </div>
          </>
        }
      />

<Route
        path="/dashboard"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Dashboard/>
            </div>
          </>
        }
      />
 <Route
        path="/userdash"
        element={
          <>
            <div className="d-flex">
              <Slider/>
              <UserDashboard />
            </div>
          </>
        }
      />
      <Route
        path="/createTask"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Task />
            </div>
          </>
        }
      />

<Route
        path="/Submitedtask"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <SubmittedTaskPage />
            </div>
          </>
        }
      />

<Route
        path="/userTask"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <UserTask />
            </div>
          </>
        }
      />

<Route
        path="/task/:taskId"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <TaskSubmittingPage />
            </div>
          </>
        }
      />

<Route
        path="/submitedByuser"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <UserTasklistpage />
            </div>
          </>
        }
      />

{/* <Route
        path="/signup"
        element={
          <>
            
            < Signup/>           
          </>
        }
      /> */}

<Route
        path="/attendoption"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <AttendanceOption />
            </div>
          </>
        }
      />  

<Route
        path="/calenderpage"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <CalendarPage />
            </div>
          </>
        }
      />  
  
  <Route
        path="/leaveform"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <LeaveForm />
            </div>
          </>
        }
      />  

<Route
        path="/attendanceform"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <AttendanceForm />
            </div>
          </>
        }
      />  

<Route
        path="/attendancelist"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <AttendanceList />
            </div>
          </>
        }
      />  
   </Route>
  </Routes>
  )
}

export default AppRouters


