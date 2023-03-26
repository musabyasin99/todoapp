import React from "react";
import { FaTrash } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

import "./viewtask.css";

const ViewTask = ({ tasks, handleDelete }) => {
  const { id } = useParams();
  const task = tasks.find((task) => task.id.toString() === id);
  return !task ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "15vh",
        }}
      >
        <p style={{ color: "orangered", margin: "2rem" }}>Task Not Found ..</p>
        <Link className="redirect" to="/add">
          Add A new Task
        </Link>
        <Link className="redirect" to="/">
          Visit Home Page
        </Link>
      </div>
    </>
  ) : (
    <div className="taskWrap">
      <div className="top">
        <h2 className="taskTitle">{task.title}</h2>
        <p className="dateTime">{task.dateTime}</p>
      </div>
      <div className="taskInfo">
        <p className="info">{task.info}</p>
      </div>
      <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
        <FaTrash role="button" />
        <span> Delete </span>
      </button>
    </div>
  );
};

export default ViewTask;
