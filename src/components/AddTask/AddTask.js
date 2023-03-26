import React from "react";

import "./addtask.css";
import * as FaIcon from "react-icons/fa";

const AddTask = ({ title, setTitle, info, setInfo, handleSubmit }) => {
  return (
    <form className="addTask" onSubmit={handleSubmit}>
      <h3 className=" form-label">Add Task</h3>
      <div className="group">
        <label htmlFor="title" className="label-primary">
          Title
        </label>
        <input
          className="field form-control"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className="field form-control"
        ></textarea>
      </div>
      <button className="btn btn-primary">
        <FaIcon.FaPlus />
      </button>
    </form>
  );
};

export default AddTask;
