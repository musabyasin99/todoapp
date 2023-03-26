import { React } from "react";
import { Link } from "react-router-dom";

import "./task.css";
import * as FaIcon from "react-icons/fa";

const Task = ({ task, handleDelete }) => {
  return (
    <li className="task">
      <Link className="title" to={`/task/${task.id}`}>
        <span>{task.title}</span>
        <small style={{ fontSize: "0.6rem" }}>({task.dateTime})</small>
      </Link>
      <div className="controls">
        <Link to={`/edit/${task.id}`}>
          <button className="btn btn-secondary btn-sm">
            <FaIcon.FaPen role="button" />
          </button>
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(task.id)}
        >
          <FaIcon.FaTrash role="button" />
        </button>
      </div>
    </li>
  );
};

export default Task;
