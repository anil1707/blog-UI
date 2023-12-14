import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { formatISO9075 } from "date-fns";
import "../App.css";
import { Context } from "../App";

const PostPage = () => {
  const { email } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  console.log("email", email, )
  console.log(postInfo.author);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let response = await fetch(`/post/${params.id}`, {
      method: "get",
    });

    let result = await response.json();
    setPostInfo(result);
  };
  console.log("postInfo", postInfo);
  const handleEditPost = () => {
    if (email) {
      navigate("/edit/" + params.id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  if (!postInfo) return "";
  return (
    <Box>
      <Nav />
      <Box sx={{ width: "80vw", margin: "0 auto" }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", margin: "0 0 5px" }}
        >
          {postInfo.title}
        </Typography>
        {postInfo?.createdAt && (
          <Typography
            sx={{ textAlign: "center", fontSize: "1rem", color: "#aaa" }}
          >
            {formatISO9075(new Date(postInfo?.createdAt))}
          </Typography>
        )}
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: ".8rem",
            fontWeight: "bold",
          }}
        >
          by @{postInfo.author}
        </Typography>
        <Box
          sx={{
            width: "80vw",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {email === postInfo?.author && (
            <Button variant="contained" onClick={handleEditPost}>
              Edit Post
            </Button>
          )}
        </Box>
        <img
          style={{
            width: "80vw",
            maxHeight: "400px",
            overflow: "hidden",
            objectFit: "cover",
            objectPosition: "center center",
          }}
          src={"http://localhost:5000/" + postInfo.cover}
          alt="post image"
        />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </Box>
    </Box>
  );
};

export default PostPage;
