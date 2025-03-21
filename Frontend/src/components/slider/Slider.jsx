import React, { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { TbLogout2 } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import  "./slider.css"

const Slider = () => {
  let [userData, setUserData] = useState(() => JSON.parse(sessionStorage.getItem("userData")));
  let [role, setRole] = useState(userData ? userData.role : "");
  let logout = useLogout();

  useEffect(() => {
    if (!userData) {
      logout();
    } else {
      setRole(userData.role);
    }
  }, [userData, logout]); // Corrected dependency array

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="rgba(255, 255, 255, 0.2)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink to="/" className="text-decoration-none" style={{ color: "inherit" }}>
            <FaUserCircle style={{ height: "50px", width: "40px" }} /> {` ${userData?.name}  `}
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {role === "customer" ? <CustomerNavLinks /> : <UserNavLinks />}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div style={{ padding: "20px 5px", cursor: "pointer" }} onClick={logout}>
            <TbLogout2 /> Logout
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

function CustomerNavLinks() {
  return (
    <>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="columns" style={{color:'black'}}>Dashboard</CDBSidebarMenuItem>
      </NavLink>

      <NavLink to="/register" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="user" style={{color:'black'}}>Create User</CDBSidebarMenuItem>
      </NavLink>

      <NavLink to="/home" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="table" style={{color:'black'}}>User Data</CDBSidebarMenuItem>
      </NavLink>

      <NavLink to="/createTask" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="file" style={{color:'black'}}>Create Task</CDBSidebarMenuItem>
      </NavLink>

      <NavLink to="/Submitedtask" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="list-check" style={{color:'black'}}>Tasks List</CDBSidebarMenuItem>
      </NavLink>
    </>
  );
}

function UserNavLinks() {
  return (
    <>
      <NavLink to="/userdash" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
  <CDBSidebarMenuItem icon="columns" style={{color:'black'}}>
    Dashboard
  </CDBSidebarMenuItem>
</NavLink>

      <NavLink to="/userTask" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="table" style={{color:'black'}}>Task</CDBSidebarMenuItem>
      </NavLink>

      <NavLink to="/submitedByuser" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="list-check" style={{color:'black'}}>Submited Task</CDBSidebarMenuItem>
      </NavLink>

      <NavLink to="/attendoption" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
        <CDBSidebarMenuItem icon="calendar-alt" style={{color:'black'}}>Attendance & Leave</CDBSidebarMenuItem>
      </NavLink>

    </>
  );
}

export default Slider;
