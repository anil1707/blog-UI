import "./App.css";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import CreatePost from "./component/CreatePost";
import PostPage from "./component/PostPage";
import { createContext, useState } from "react";
import EditPost from "./component/EditPost";

export let Context = createContext();

function App() {
  const [email, setEmail] = useState("")
  let setAndGetEmail = (data) =>{
    setEmail(data)
  }
  return (
    <Context.Provider value={{email, setAndGetEmail}}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost/>} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
