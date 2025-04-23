import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeCard from "./components/EmployeeCard";
import FilterSidebar from "./components/FilterSidebar";
import axios from "axios";
import EmployeeDetails from "./components/EmployeeDetails";
import EditEmployeeModal from "./components/EditEmployeeModal";
import TaskModal from "./components/TaskModal"; 
import TaskDescriptionPage from "./components/TaskDescriptionPage";
import "./index.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("new");
  const [filters, setFilters] = useState({
    keywords: [],
    intern: true,
    fullTime: true,
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        setEmployees([]);
      });
  }, []);

  const handleAssignTask = (employee) => {
    setCurrentEmployee(employee); 
    setTaskModalOpen(true);
  };

  const handleTaskSave = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
  };
  const handleRemoveEmployee = (empId) => {
    axios
      .delete(`http://localhost:5000/api/employees/${empId}`)
      .then(() => {
        setEmployees((prev) => prev.filter((e) => e._id !== empId));
      })
      .catch((error) => {
        console.error("Error removing employee:", error);
      });
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp._id === updatedEmployee._id ? updatedEmployee : emp
      )
    );
  };

  const filteredEmployees = employees
    .filter((emp) => {
      const matchesType =
        (filters.intern && emp.type === "Intern") ||
        (filters.fullTime && emp.type === "Full-Time");
      const matchesSearch = emp.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesKeywords =
        filters.keywords.length === 0 ||
        filters.keywords.some((keyword) =>
          emp.role.toLowerCase().includes(keyword.toLowerCase())
        );

      return matchesType && matchesSearch && matchesKeywords;
    })
    .sort((a, b) => {
      if (sort === "new") return new Date(b.joined) - new Date(a.joined);
      if (sort === "salary") return b.salary - a.salary;
      if (sort === "years") return b.years - a.years;
      return 0;
    });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
              <FilterSidebar filters={filters} setFilters={setFilters} />

              <div className="flex-1 bg-white p-8 rounded-xl shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search employees by name..."
                    className="w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <div>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="p-3 border-2 border-gray-300 rounded-lg"
                    >
                      <option value="new">Newest</option>
                      <option value="salary">Salary (High to Low)</option>
                      <option value="years">Years of Experience</option>
                    </select>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  Total Employees: {filteredEmployees.length}
                </h2>
                <div className="space-y-6">
                  {filteredEmployees.map((emp) => (
                    <EmployeeCard
                      key={emp._id}
                      employee={emp}
                      onEdit={handleEditEmployee} 
                      onRemove={handleRemoveEmployee}
                      onAssignTask={handleAssignTask} 
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        />

        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/tasks/:taskId" element={<TaskDescriptionPage />} />
      </Routes>

      {isModalOpen && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEmployee}
        />
      )}

      {taskModalOpen && currentEmployee && (
        <TaskModal
          employee={currentEmployee}
          onClose={() => setTaskModalOpen(false)}
          onSave={handleTaskSave}
        />
      )}
    </Router>
  );
};

export default App;
