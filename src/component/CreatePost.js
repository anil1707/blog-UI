import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import Nav from "./Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  // const [creatPost, setCreatPost] = useState({});
  const [isCreatePostClicked, setisCreatePostClicked] = useState(false);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSummary = (e) => {
    setSummary(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleContent = (newValue) => {
    setContent(newValue);
  };

  const handleFile = (e) => {
    setFiles(e.target.files);
  };
  const handleCreatePost = async () => {
    if (files) {
      setisCreatePostClicked(true);
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("category", category);
      data.set("content", content);
      data.set("files", files[0]);
      let response = await fetch("https://blog-backend-i14c.onrender.com/post/createPost", {
        method: "post",
        body: data,
        credentials: "include",
      });
      await response.json();
      // setCreatPost(result);

      navigate("/");
    }
  };
  return (
    <Box>
      <Nav />
      <Box>
        <Box sx={{ width: "50vw", margin: "0 auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "30vh",
              justifyContent: "space-around",
            }}
          > 
            <TextField
              placeholder="tile"
              value={title}
              onChange={handleTitle}
            />
            <TextField
              placeholder="Summary"
              value={summary}
              onChange={handleSummary}
            />
            <TextField type="file" onChange={handleFile} />
            <TextField
              placeholder="Category"
              value={category}
              onChange={handleCategory}
            />
          </Box>
          <ReactQuill value={content} onChange={handleContent} />
          <Button
            sx={{ marginTop: "10px", width: "50vw" }}
            variant="contained"
            size="medium"
            onClick={handleCreatePost}
          >
            {!isCreatePostClicked ? (
              "Create Post"
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress sx={{ color: "red", marginRight: "10px" }} />{" "}
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
