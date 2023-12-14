import { Box, Link, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import Post from "./Post";
import { Context } from "../App";

const Home = () => {
  let {email} = useContext(Context)
  const [posts, setPosts] = useState  ({})
  useEffect(() => {
    getAllPost();
  }, []);

  let getAllPost = async () => {
    let response = await fetch("/post/getPost");
    let result = await response.json();
    console.log(result);
    setPosts(result.posts)
  };
  console.log(email);
  return (
    <Box>
      <Nav />
      {posts.length && posts.map(post=>{
        return (
          <Post {...post} />
        )
      })}
    </Box>
  );
};

export default Home;
