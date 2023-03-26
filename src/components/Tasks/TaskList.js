import { React, useState, useEffect } from "react";

import Task from "./Tasks";
import Search from "../Search/Search";

import "./tasklist.css";

const TaskList = ({ tasks, setTasks, handleDelete }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  useEffect(() => {
    const updatedList = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setSearchRes(updatedList.reverse());
  }, [tasks, searchKey]);
  return (
    <div className="listWrapper">
      <div className="top">
        <h3 className="form-label">Tasks</h3>
        <Search search={searchKey} setSearch={setSearchKey} />
      </div>
      <div className="tasklistWrap">
        <ul className="taskList">
          {searchRes.length ? (
            searchRes.map((task) => {
              return (
                <Task key={task.id} task={task} handleDelete={handleDelete} />
              );
            })
          ) : (
            <p style={{ marginTop: "20vh", color: "aliceblue" }}>
              No Task Found
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
