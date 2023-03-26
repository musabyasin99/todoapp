import { React, useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import * as FaIcon from "react-icons/fa";

import "./edittask.css";

const EditTask = ({ tasks, setTasks }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editInfo, setEditInfo] = useState("");
  const history = useNavigate();
  const { id } = useParams();
  const task = tasks.find((task) => task.id.toString() === id);
  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditInfo(task.info);
    }
  }, [task, setEditTitle, setEditInfo]);
  const handleEdit = (id) => {
    const updatedTask = {
      id,
      title: editTitle,
      info: editInfo,
    };
    const res = tasks.map((task) => (task.id === id ? updatedTask : task));
    localStorage.setItem("tasklist", JSON.stringify(res));
    setTasks(res);
    setEditTitle("");
    setEditInfo("");
    history("/todoapp");
  };
  return (
    <form
      className="editTask"
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(task.id);
      }}
    >
      <h3 className=" form-label">Edit</h3>
      <div className="group">
        <label htmlFor="title" className="label-primary">
          Title
        </label>
        <input
          className="field form-control"
          type="text"
          placeholder="Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="group">
        <label htmlFor="info" className="label-primary">
          Details
        </label>
        <textarea
          rows="5"
          color="10"
          value={editInfo}
          onChange={(e) => setEditInfo(e.target.value)}
          className="field form-control"
        ></textarea>
      </div>
      <button className="btn btn-warning">
        <FaIcon.FaPencilAlt />
      </button>
    </form>
  );
};

export default EditTask;
