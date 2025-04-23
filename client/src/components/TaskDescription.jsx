import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskDescription = ({ taskId }) => {
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      axios
        .get("/api/user")
        .then((response) => setUser(response.data))
        .catch((err) => setError("Error fetching user data"));
    }
  };

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/tasks/${taskId}`
      );
      const taskData = response.data;

      if (taskData.assignee) {
        const assigneeId =
          typeof taskData.assignee === "object"
            ? taskData.assignee._id
            : taskData.assignee;

        const assigneeResponse = await axios.get(
          `http://localhost:5000/api/employees/${assigneeId}`
        );
        taskData.assigneeName = assigneeResponse.data.name; 
      }

      setTask(taskData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching task");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) fetchTask();
    fetchUser();
  }, [taskId]);

  const handleStatusChange = async (e) => {
    await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
      ...task,
      status: e.target.value,
    });
    fetchTask();
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    const updatedTask = {
      ...task,
      comments: [
        ...task.comments,
        {
          text: comment,
          user: user ? user.name : "Unknown",
          createdAt: new Date(),
        },
      ],
    };
    await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
    setComment("");
    fetchTask();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedTask = {
        ...task,
        attachments: [...task.attachments, res.data.filename],
      };

      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
      setFile(null);
      fetchTask();
    } catch (err) {
      setError("Error uploading file");
    }
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!task)
    return <p className="text-center text-gray-500">Task not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-10 border border-gray-200">
        {/* Task Title & Description Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Task Title & Description Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4 col-span-2">
            <h2 className="text-3xl font-bold text-gray-800">{task.title}</h2>

            {/* Task Description Section with Preserved Formatting and Scroll */}
            <div
              className="text-gray-600 mt-2 overflow-auto"
              style={{
                whiteSpace: "pre-line", 
                maxHeight: "400px", 
              }}
            >
              {task.description}
            </div>
          </div>

          {/* Task Details Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
            <h3 className="font-semibold text-xl text-gray-800">
              Task Details
            </h3>
            <div className="mb-4 flex items-center space-x-4">
              <label className="font-semibold text-gray-700">Status</label>
              <select
                value={task.status}
                onChange={handleStatusChange}
                className="w-1/4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Status:</p>
                <p className="text-gray-600">{task.status}</p>{" "}
                {/* Displaying task status */}
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Assignee:</p>
                <p className="text-gray-600">
                  {task.assigneeName || "Unassigned"}
                </p>{" "}
                {/* Show assignee's name */}
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Team:</p>
                <p className="text-gray-600">
                  {task.team || "No Team Assigned"}
                </p>{" "}
                {/* Display team */}
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Start Date:</p>
                <p className="text-gray-600">
                  {new Date(task.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">End Date:</p>
                <p className="text-gray-600">
                  {new Date(task.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Reporter:</p>
                <p className="text-gray-600">
                  {task.reporter || "No Reporter"}
                </p>{" "}
              </div>
            </div>
          </div>
        </div>

        {/* Attachments Section with Horizontal Scrolling */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
          <h4 className="font-semibold text-lg text-gray-700 mb-2">
            Attachments
          </h4>
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-4">
              {task.attachments?.map((file, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 p-2 rounded-lg shadow-sm border"
                >
                  <img
                    src={`http://localhost:5000/uploads/${file}`}
                    alt={`Attachment ${i + 1}`}
                    className="w-32 h-32 object-cover rounded cursor-pointer"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/uploads/${file}`,
                        "_blank"
                      )
                    }
                  />
                  <p className="mt-1 text-sm text-gray-600">{file}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded p-2 text-sm"
            />
            <button
              onClick={handleFileUpload}
              className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Upload Attachment
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h4 className="font-semibold text-lg text-gray-700 mb-4">Comments</h4>
          <ul className="space-y-4">
            {task.comments?.map((c, i) => {
              const initials = task.assigneeName
                ? task.assigneeName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"; 
              const time = new Date(c.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              });

              return (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                    {initials}
                  </div>
                  <div>
                    <div className="text-gray-800">{c.text}</div>
                    <div className="text-sm text-gray-500 mt-1">{time}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Add Comment Section */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Add Comment
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="4"
            placeholder="Write your comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
