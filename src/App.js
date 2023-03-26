import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header/Header";
import TaskList from "./components/Tasks/TaskList";
import AddTask from "./components/AddTask/AddTask";
import ViewTask from "./components/ViewTask/ViewTask";
import EditTask from "./components/EditTask/EditTask";
import Footer from "./components/Footer/Footer";

import "./App.css";
import format from "date-fns/format";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem("tasklist")) || [];
    setTasks(tasklist);
  }, []);

  const handleDelete = (id) => {
    const tasklist = [...tasks];
    const updatedList = tasklist.filter((task) => task.id !== id);
    setTasks(updatedList);
    localStorage.setItem("tasklist", JSON.stringify(updatedList));
    history("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const tasklist = [...tasks];
    const id = tasklist.length ? tasklist.length - 1 + 1 : 0;
    const newTask = {
      id,
      title: title,
      info: info,
      dateTime: format(new Date(), "MM/dd/yyyy , pp"),
    };
    const updatedList = [...tasks, newTask];
    setTasks(updatedList);
    localStorage.setItem("tasklist", JSON.stringify(updatedList));
    setTitle("");
    setInfo("");
    history("/");
  };
  return (
    <>
      <Header text={"To-do"} />
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddTask
                title={title}
                setTitle={setTitle}
                info={info}
                setInfo={setInfo}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={<EditTask tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/task/:id"
            element={<ViewTask tasks={tasks} handleDelete={handleDelete} />}
          />
          <Route path="/info" element={<h1>Information !!</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
