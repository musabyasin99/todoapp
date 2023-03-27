import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import format from "date-fns/format";

// Component Imports

import Header from "./components/Header/Header";
import TaskList from "./components/Tasks/TaskList";
import AddTask from "./components/AddTask/AddTask";
import ViewTask from "./components/ViewTask/ViewTask";
import EditTask from "./components/EditTask/EditTask";
import Footer from "./components/Footer/Footer";
import AlertBox from "./components/AlertBox/AlertBox";

// Stylesheets

import "./App.css";

// Main

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem("tasklist")) || [];
    setTasks(tasklist);
  }, []);

  /*Alert Box <>*/
  const viewBox = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      setMessage("");
    }, 3000);
  };
  /*Alert Box </>*/

  /*EventHandling <>*/

  /*Deletin Tasks <>*/
  const handleDelete = (id) => {
    const tasklist = [...tasks];
    const updatedList = tasklist.filter((task) => task.id !== id);
    setTasks(updatedList);
    localStorage.setItem("tasklist", JSON.stringify(updatedList));
    history("/todoapp");
    setMessage("Task Deleted Sucessfully !");
    viewBox();
  };
  /*Deletin Tasks </>*/
  /*Adding Tasks <>*/
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
    history("/todoapp");
    setMessage("Task Added Sucessfully !");
    viewBox();
  };
  /*Adding Tasks </>*/
  /*EventHandling </>*/
  /* Main JSX */
  return (
    <>
      <Header text={"To-do"} />
      <AlertBox alert={alert} setAlert={setAlert} message={message} />
      <main>
        <Routes>
          {/*Home Route*/}
          <Route
            path="/"
            element={
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "30vh",
                }}
              >
                Welcome ...!!
              </h1>
            }
          />
          {/*Tasks Route */}
          <Route
            path="/todoapp"
            element={
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                handleDelete={handleDelete}
              />
            }
          />
          {/*Add Task */}
          <Route
            path="/todoapp/add"
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
          {/*Edit Task */}
          <Route
            path="/todoapp/edit/:id"
            element={
              <EditTask
                tasks={tasks}
                setTasks={setTasks}
                message={message}
                setMessage={setMessage}
                viewBox={viewBox}
              />
            }
          />
          {/* View Task */}
          <Route
            path="/todoapp/task/:id"
            element={<ViewTask tasks={tasks} handleDelete={handleDelete} />}
          />
          {/* Info */}
          <Route
            path="/todoapp/info"
            element={
              <h1
                style={{
                  marginTop: "30vh",
                  textAlign: "center",
                  color: "dodgerblue",
                  fontSize: "1.2rem",
                  transform: "skewX(-10deg)",
                }}
              >
                {format(Date.now(), "mm/dd/yy , pp")}
              </h1>
            }
          />
          {/*Page Not Found */}
          <Route
            path="*"
            element={
              <p
                style={{
                  marginTop: "30vh",
                  width: "100%",
                  textAlign: "center",
                  color: "orange",
                  fontSize: "1.2rem",
                  transform: "skewX(-10deg)",
                }}
              >
                Page Not Found
              </p>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
