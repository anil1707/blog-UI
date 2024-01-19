import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { formatISO9075 } from "date-fns";
import "../App.css";
import { Context } from "../App";
import CircularProgress from "@mui/material/CircularProgress";

const PostPage = () => {
  const { email } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [, setIsLoggedIn] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch(`https://blog-backend-i14c.onrender.com/post/${params.id}`, {
      method: "get",
      credentials: "include",
    }).then((response) => {
      response.json().then((result) => {
        if (result) {
          setLoader(false);
        }
        setPostInfo(result);
      });
    });
  }, [params.id]);

  const handleEditPost = () => {
    if (email) {
      navigate("/edit/" + params.id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleDelete = async () => {
    let response = await fetch(
      `http://localhost:5000/post/delete/${params.id}`,
      {
        method: "delete",
        credentials: "include",
      }
    );
    await response.json();
    navigate("/");
  };
  if (!postInfo) return "";
  return (
    <Box>
      <Nav />
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
      {!loader && (
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
            by @{postInfo.author.split("@")[0]}
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
              <Box
                sx={{
                  width: "9vw",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleEditPost}
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  width="3vw"
                  size="small"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
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
            src={postInfo.cover}
            alt="post"
          />
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostPage;
