import React, { useState } from "react";
import axios from "axios";

const AddUserModal = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    type: "Full-Time",
    photo: null,
    salary: "",
    joined: "",
    years: "",
    address: "",
    phoneNumber: "",
    tasksAssigned: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskIds = [];

      for (const task of formData.tasksAssigned) {
        const taskRes = await axios.post(
          "http://localhost:5000/api/tasks",
          task
        );
        taskIds.push(taskRes.data._id);
      }

      // Prepare FormData for submission
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("role", formData.role);
      submissionData.append("type", formData.type);
      submissionData.append("salary", formData.salary);
      submissionData.append("joined", formData.joined);
      submissionData.append("years", formData.years);
      submissionData.append("address", formData.address);
      submissionData.append("phoneNumber", formData.phoneNumber);
      submissionData.append("photo", formData.photo);

      // Only append tasks if there are any
      if (taskIds.length > 0) {
        submissionData.append("tasksAssigned", JSON.stringify(taskIds)); 
      }

      // Submit the data to the backend
      const res = await axios.post(
        "http://localhost:5000/api/employees",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Employee added successfully", res.data);
      onUserAdded && onUserAdded();
      onClose();
    } catch (err) {
      console.error("Error adding employee", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl h-auto rounded-2xl shadow-lg border border-gray-300">
        <div className="px-6 py-4 border-b bg-blue-600 rounded-t-2xl">
          <h2 className="text-2xl font-semibold text-white">
            Add New Employee
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="input border border-gray-300 rounded-md "
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="input border border-gray-300 rounded-md "
          />
          <input
            name="role"
            placeholder="Job Role"
            onChange={handleChange}
            required
            className="input border border-gray-300 rounded-md "
          />
          <select
            name="type"
            onChange={handleChange}
            className="input border border-gray-300 rounded-md "
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Intern">Intern</option>
          </select>
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="input col-span-2 border border-gray-300 rounded-md "
          />
          <input
            name="salary"
            type="number"
            placeholder="Salary"
            onChange={handleChange}
            className="input border border-gray-300 rounded-md "
          />
          <input
            name="joined"
            type="date"
            onChange={handleChange}
            className="input border border-gray-300 rounded-md "
          />
          <input
            name="years"
            type="number"
            placeholder="Years of Experience"
            onChange={handleChange}
            className="input border border-gray-300 rounded-md "
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="input col-span-2 border border-gray-300 rounded-md "
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            className="input col-span-2 border border-gray-300 rounded-md "
          />

          <div className="col-span-2 flex justify-end items-center gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
