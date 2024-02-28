import "./App.css";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import CreatePost from "./component/CreatePost";
import PostPage from "./component/PostPage";
import { createContext, useState } from "react";
import EditPost from "./component/EditPost";
import WrongPage from "./component/WrongPage";
import OtherUserProfile from "./component/OtherUserProfile";
import ScaltonForPost from "./component/ScaltonForPost";

export let Context = createContext();

function App() {
  const [userDetail, setUserDetail] = useState("");
  const [otherUserDetail, setOtherUserDetail] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState([]);
  const [filterBy, setFilterBy] = useState();
  const [category, setCategory] = useState([]);

  let getUserDetail = (data) => {
    setUserDetail(data);
  };

  let getOtherUserDetail = (data) => {
    setOtherUserDetail(data);
  };

  const setSearchOpenClose = (data) => {
    setIsSearchOpen(data);
  };

  const sendSearchText = (data) => {
    setSearchText(data);
  };

  const sendFilterText = (data) => {
    setFilterBy(data);
  };

  const setCategoryItem = (data) => {
    setCategory(data);
  };

  const isLoggedIn = localStorage.getItem("loginStatus");

  const controllRoute = () => {
    if (isLoggedIn === "true") {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/create"} element={<CreatePost />} />

          <Route
            exact
            path="/user-profile/:email"
            element={<OtherUserProfile />}
          />
          <Route path="/scalton" element={<ScaltonForPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      );
    } else if (isLoggedIn === "false") {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/create"} element={<Login />} />

          <Route
            exact
            path="/user-profile/:email"
            element={<OtherUserProfile />}
          />
          <Route path="/scalton" element={<ScaltonForPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path={"/create"} element={<CreatePost />} /> */}

          <Route
            exact
            path="/user-profile/:email"
            element={<OtherUserProfile />}
          />

          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/scalton" element={<ScaltonForPost />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      );
    }
  };

  return (
    <Context.Provider
      value={{
        userDetail,
        otherUserDetail,
        getUserDetail,
        getOtherUserDetail,
        setSearchOpenClose,
        isSearchOpen,
        sendSearchText,
        sendFilterText,
        searchText,
        filterBy,
        category,
        setCategoryItem,
      }}
    >
      <div className="App">{controllRoute()}</div>
    </Context.Provider>
  );
}

export default App;
