// User Defined Component Routes

import Header from "./components/header/header";
import Nav from "./components/nav/nav";
import Home from "./components/mainApp/home/home";
import Posts from "./components/mainApp/posts/posts";
import NewPosts from "./components/mainApp/posts/newPosts";
import EditPost from "./components/mainApp/posts/editPost";
import About from "./components/mainApp/about";
import Missing from "./components/mainApp/missing";
import Footer from "./components/footer/footer";

import { format } from "date-fns";

import api from "./services/posts";

// Stylesheet
import "./App.css";

// Built-in Components
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useNavigate();
  useEffect(() => {
    const filteredList = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchRes(filteredList.reverse());
  }, [posts, search]);
  // fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        if (response && response.data) setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error : ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);
  const handleEdit = async (id) => {
    const editedOn = `${format(new Date(), "MMMM dd,yyyy pp")}(edited)`;
    const updatedPost = {
      id,
      title: editTitle,
      body: editBody,
      dateTime: editedOn,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history("/");
    } catch (err) {
      alert(`Error : ${err.message}`);
    }
  };
  const handleDelete = async (id) => {
    try {
      const API_URL = `/posts/${id}`;
      await api.delete(API_URL);
      const postsUpdated = posts.filter((post) => post.id !== id);
      setPosts(postsUpdated);
      localStorage.setItem("blogs", JSON.stringify(postsUpdated));
      history("/");
      alert("Post Deleted SuccessFully");
    } catch (err) {
      alert(`Error : ${err.message}`);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 0;
    const newPost = {
      id,
      title: postTitle,
      body: postBody,
      dateTime: format(new Date(), "MMMM dd,yyyy pp"),
    };
    try {
      const response = await api.post("/posts", newPost);
      const updatedList = [...posts, response.data];
      setPosts(updatedList);
      localStorage.setItem("blogs", JSON.stringify(updatedList));
      setPostTitle("");
      setPostBody("");
      history("/");
      alert("Post Added SuccessFully");
    } catch (err) {
      alert(`Error : ${err.message}`);
    }
  };
  return (
    <div className="App">
      <Header title="Blog App" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={searchRes} />} />

        <Route
          path="/post"
          element={
            <NewPosts
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/post/edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          }
        />
        <Route
          exact
          path="/post/:id"
          element={
            <Posts
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
