import React, { useState } from "react";
import axios from "axios";

const TaskModal = ({ employee, onClose, onSave }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Pending",
    assignee: employee?.name || "",
    team: "",
    startDate: "",
    endDate: "",
    reporter: "",
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => file.name);
    setTaskData((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskDetails = {
        ...taskData,
        employeeId: employee._id,
      };
      const response = await axios.post(
        `http://localhost:5000/api/employees/${employee._id}/assign-task`,
        taskDetails
      );
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Assign Task to {employee.name}
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Task Title", name: "title", type: "text" },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              rows: 3,
            },
            {
              label: "Status",
              name: "status",
              type: "select",
              options: ["Pending", "Ongoing", "Completed"],
            },
            { label: "Assignee", name: "assignee", type: "text" },
            { label: "Team", name: "team", type: "text" },
            { label: "Reporter", name: "reporter", type: "text" },
            { label: "Start Date", name: "startDate", type: "date" },
            { label: "End Date", name: "endDate", type: "date" },
          ].map(({ label, name, type, rows, options }) => (
            <div className="mb-4" key={name}>
              <label className="block mb-1 font-semibold">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={taskData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={rows}
                  required
                />
              ) : type === "select" ? (
                <select
                  name={name}
                  value={taskData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={name}
                  type={type}
                  value={taskData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required={name !== "team" && name !== "reporter"}
                />
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Attachments</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            {taskData.attachments?.length > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {taskData.attachments.length} file(s) selected
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 p-2 bg-gray-300 text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
