import { Link } from "react-router-dom";

const EmployeeCard = ({ employee, onEdit, onRemove, onAssignTask }) => {
  const getImageUrl = (photoPath) => {
    if (!photoPath) return "https://via.placeholder.com/100";
    if (photoPath.startsWith("http")) return photoPath;
    return `http://localhost:5000/${photoPath.replace(/\\/g, "/")}`;
  };

  return (
    <div className="border p-6 rounded-xl shadow-lg flex gap-6 items-center hover:shadow-2xl transition-all duration-300">
      <img
        src={getImageUrl(employee.photo)}
        alt="employee"
        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800">
          {employee.name}
        </h2>
        <p className="text-lg text-gray-600">{employee.role}</p>
        <span
          className={`text-sm font-semibold ${
            employee.status === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {employee.status}
        </span>
        <div className="mt-4 space-x-4">
          <Link
            to={`/employee/${employee._id}`}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            View
          </Link>
          <button
            onClick={() => onEdit(employee)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(employee._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
          <button
            onClick={() => onAssignTask(employee)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
