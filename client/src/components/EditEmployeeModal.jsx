import React, { useState, useEffect } from 'react';

const EditEmployeeModal = ({ employee, isOpen, onClose, onSave }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const [image, setImage] = useState(null); 

  useEffect(() => {
    if (employee) {
      setEditedEmployee(employee);  
      setImage(employee.image);  
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setEditedEmployee(prev => ({
        ...prev,
        photo: file,  
      }));
    }
  };
  
  const handleSaveClick = () => {
    const formData = new FormData();
    formData.append('name', editedEmployee.name);
    formData.append('role', editedEmployee.role);
    formData.append('salary', editedEmployee.salary);
    formData.append('years', editedEmployee.years);
    formData.append('type', editedEmployee.type);
    formData.append('email', editedEmployee.email || '');
    formData.append('joined', editedEmployee.joined || '');
    formData.append('address', editedEmployee.address || '');
    formData.append('phoneNumber', editedEmployee.phoneNumber || '');
    formData.append('status', editedEmployee.status || '');
  
    if (editedEmployee.photo instanceof File) {
      formData.append('photo', editedEmployee.photo);
    }
  
    if (Array.isArray(editedEmployee.tasksAssigned)) {
      formData.append('tasksAssigned', JSON.stringify(editedEmployee.tasksAssigned));
    }
  
    fetch(`http://localhost:5000/api/employees/${editedEmployee._id}`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(updatedEmployee => {
        onSave(updatedEmployee);
        onClose();
      })
      .catch(error => console.error('Error updating employee:', error));
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
        
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={editedEmployee.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        
        <label className="block text-sm font-medium text-gray-700">Role:</label>
        <input
          type="text"
          name="role"
          value={editedEmployee.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        
        <label className="block text-sm font-medium text-gray-700">Salary:</label>
        <input
          type="number"
          name="salary"
          value={editedEmployee.salary}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        
        {/* Years of experience */}
        <label className="block text-sm font-medium text-gray-700">Years of Experience:</label>
        <input
          type="number"
          name="yearsOfExperience"
          value={editedEmployee.years}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        
        {/* Image upload input */}
        <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mb-4"
        />
        
        {/* Display the image preview */}
        {image && <img src={image} alt="Preview" className="w-32 h-32 object-cover mb-4 rounded-md" />}
        
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
