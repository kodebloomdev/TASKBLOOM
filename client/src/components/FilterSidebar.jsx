import React, { useState } from "react";
import AddUserModal from "./AddUserModal"; 

const FilterSidebar = ({
  filters,
  setFilters,
  onKeywordRemove,
  onUserAdded,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleKeywordAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newKeyword = e.target.value.trim();
      if (!filters.keywords.includes(newKeyword)) {
        setFilters((prev) => ({
          ...prev,
          keywords: [...prev.keywords, newKeyword],
        }));
      }
      e.target.value = "";
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setFilters((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keywordToRemove),
    }));
  };

  return (
    <div className="w-80 bg-white p-6 rounded-xl shadow-xl border border-gray-200 relative">
      <h3 className="font-bold text-xl text-gray-800 mb-4">Filters</h3>

      {/* Keywords */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Keywords</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.keywords.map((kw, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-800 flex items-center"
            >
              {kw}
              <button
                onClick={() => handleRemoveKeyword(kw)}
                className="ml-2 text-red-500"
              >
                ❌
              </button>
            </span>
          ))}
        </div>
        <input
          onKeyPress={handleKeywordAdd}
          placeholder="Search employees by role..."
          className="w-full p-3 pb-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>

      {/* Intern / Full-Time checkboxes */}
      <div className="mb-4">
        <input
          type="checkbox"
          checked={filters.intern}
          onChange={() =>
            setFilters((prev) => ({ ...prev, intern: !prev.intern }))
          }
          className="mr-2"
        />
        <span className="text-gray-700">Intern</span>
        <br />
        <input
          type="checkbox"
          checked={filters.fullTime}
          onChange={() =>
            setFilters((prev) => ({ ...prev, fullTime: !prev.fullTime }))
          }
          className="mr-2"
        />
        <span className="text-gray-700">Full-Time</span>
      </div>

      {/* Add User Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl w-full hover:bg-blue-700 transition"
      >
        ➕ Add User
      </button>

      {/* Modal */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onUserAdded={onUserAdded}
        />
      )}
    </div>
  );
};

export default FilterSidebar;
