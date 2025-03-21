import React, { useState, useEffect } from "react";
import AxiosService from "../../components/utils/ApiService";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/utils/Spinners";
import styles from "./task.module.css";

const CreateTask = ({ refreshTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(""); // Stores selected user email
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setError(""); // Clear error when closing the modal
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await AxiosService.get(`/user/getdata`);
        if (res.status === 200) {
          setUserData(res.data.userData);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching users.");
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !description || !assignedTo) {
        setError("All fields are required");
        return;
      }
      setLoading(true);
      const response = await AxiosService.post("/task/create", {
        title,
        description,
        assignedTo,
      });
      toast.success(response.data.message);
      refreshTasks();

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setError("");

      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.taskForm}>
      <Button variant="primary" onClick={handleShow} disabled={loading}>
        {loading ? <Spinner /> : "Create Task"}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="assignedTo" className="form-label">
                Assign to Employee
              </label>
              <select
                className="form-control"
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Select Employee</option>
                {userData
                  .filter((user) => user.role !== "customer") // Exclude customers
                  .map((user) => (
                    <option key={user.email} value={user.email}>
                      {user.name} ({user.email})
                    </option>
                  ))}
              </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateTask;
