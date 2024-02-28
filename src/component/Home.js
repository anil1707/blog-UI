import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import CircularProgress from "@mui/material/CircularProgress";
import SearchComponent from "./SearchComponent";
import { Context } from "../App";
import HomeCard from "./HomeCard";

const Home = () => {
  let {
    isSearchOpen,
    setSearchOpenClose,
    searchText,
    filterBy,
    sendSearchText,
    setCategoryItem,
  } = useContext(Context);
  const [posts, setPosts] = useState({});
  const [searchedPost, setSearchedPost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  let [loader, setLoader] = useState(true);
  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    const searchPost = (text) => {
      let filtredPost;
      if (Array.isArray(posts) && text !== "") {
        filtredPost = posts?.filter((item) => {
          let data = item.title?.toLowerCase();
          return data.includes(text && text?.toLowerCase());
        });
      }

      setSearchedPost(filtredPost);
    };
    searchPost(searchText);
  }, [searchText]);

  useEffect(() => {
    const filterPostByCategory = (categoryItem) => {
      let filteredPost;
      if (Array.isArray(posts) && categoryItem) {
        filteredPost = posts?.filter((item) => {
          let data = item.category?.toLowerCase();
          return data.includes(categoryItem?.toLowerCase());
        });
        setFilteredPost(filteredPost);
      }
    };
    filterPostByCategory(filterBy);
  }, [filterBy]);

  let getAllPost = async () => {
    let response = await fetch("http://localhost:5000/post/getPost");
    let result = await response.json();
    let filterArr = [];
    result?.posts.filter((item) => {
      if (!filterArr.includes(item?.category)) {
        filterArr.push(item?.category);
      }
      setCategoryItem(filterArr);
      return 0;
    });
    setPosts([...result.posts]);
    if (result.posts) {
      setLoader(false);
    }
  };
  if (posts.length)
    posts.sort((a, b) => {
      return new Date(new Date(b.createdAt) - new Date(a.createdAt));
    });

  if (filteredPost.length > 0 && filterBy) {
    setSearchOpenClose(false);
    return (
      <Box>
        <Nav />
        <Box
          sx={{
            maxWidth: "90vw",
            marginLeft: "100px",
            display: "grid",
            gridTemplateColumns: "1fr repeat(3, 1fr)",
            gap: "40px",
            margin: "40px 0 40px 100px",
          }}
        >
          {filteredPost.length &&
            filteredPost.map((post) => {
              return <HomeCard item={post} />;
            })}
        </Box>
      </Box>
    );
  } else if (filterBy) {
    return (
      <Box>
        <Nav />
        <Box
          style={{ display: "flex", justifyContent: "center", color: "gray" }}
        >
          <h1>No data found for applied filter</h1>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Nav />
      {isSearchOpen && <SearchComponent findSearchText={sendSearchText} />}
      {loader && (
        <Box
          sx={{
            width: "80vw",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />{" "}
        </Box>
      )}
      {searchedPost ? (
        searchedPost.length > 0 ? (
          <Box
            sx={{
              maxWidth: "90vw",
              marginLeft: "100px",
              display: "grid",
              gridTemplateColumns: "1fr repeat(3, 1fr)",
              gap: "40px",
              margin: "40px 0 40px 100px",
            }}
          >
            {searchedPost.map((item, index) => {
              return <HomeCard item={item} />;
            })}
          </Box>
        ) : (
          <Box
            style={{ display: "flex", justifyContent: "center", color: "gray" }}
          >
            <h1>There is no such item which you search!!</h1>
          </Box>
        )
      ) : (
        <Box
          sx={{
            maxWidth: "90vw",
            marginLeft: "100px",
            display: "grid",
            gridTemplateColumns: "1fr repeat(3, 1fr)",
            gap: "40px",
            margin: "40px 0 40px 100px",
          }}
        >
          {posts.length &&
            posts.map((post, index) => {
              // return <Post key={index} {...post} />;
              return <HomeCard item={post} key={index} />;
            })}
        </Box>
      )}
    </Box>
  );
};

export default Home;
