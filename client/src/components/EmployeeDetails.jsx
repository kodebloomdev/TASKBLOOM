import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (date) => {
  const formattedDate = new Date(date);
  return isNaN(formattedDate)
    ? "Invalid Date"
    : formattedDate.toLocaleDateString();
};

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((res) => {
        console.log(res.data); 
        setEmployee(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!employee) {
    return (
      <p className="text-center text-lg mt-10">Loading employee details...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={
            employee.photo
              ? `http://localhost:5000/${employee.photo}`
              : "https://via.placeholder.com/150"
          }
          alt={employee.name}
          className="w-48 h-48 rounded-full object-cover shadow-md border-2 border-gray-300"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800">{employee.name}</h1>
        <p className="text-lg text-gray-600 mt-1">{employee.role}</p>
        <p className="text-gray-700 mt-2">
          <strong>Status:</strong> {employee.status}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Type:</strong> {employee.type}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Phone:</strong> {employee.phoneNumber}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Address:</strong> {employee.address}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Joined:</strong>{" "}
          {new Date(employee.joined).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Years of Experience:</strong> {employee.years}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Salary:</strong> ₹{employee.salary}
        </p>

        {/* Tasks Assigned */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Tasks Assigned:
          </h2>
          {employee.tasksAssigned && employee.tasksAssigned.length > 0 ? (
            <ul className="space-y-2">
              {employee.tasksAssigned.map((task, index) => {
                console.log("Task data:", task); // Check the task data in the console
                return (
                  <li key={index} className="bg-gray-100 p-3 rounded-lg">
                    <p>
                      <strong>Title:</strong>{" "}
                      <Link
                        to={`/tasks/${task._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {task.title || "No title available"}
                      </Link>
                    </p>
                    <p>
                      <strong>Start:</strong>{" "}
                      {formatDate(task.startDate) || "Invalid Date"}
                    </p>
                    <p>
                      <strong>End:</strong>{" "}
                      {formatDate(task.endDate) || "Invalid Date"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {task.status || "No status available"}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No tasks assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
