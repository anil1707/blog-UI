import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import Nav from "./Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import API_BASE_URL from "../config";

const CreatePost = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [photoLoader, setPhotoLoader] = useState(false);
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

  const handleUploadFile = async (e) => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/login");
    }
    setPhotoLoader(true);
    let files = e.target.files;
    const data = new FormData();
    data.set("files", files[0]);

    let response = await fetch(`${API_BASE_URL.base_url}/post/uploadPhoto`, {
      method: "post",
      body: data,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    let result = await response.json();
    setPhotoLoader(false);
    setFiles(result.url);
  };
  const handleCreatePost = async () => {
    if (localStorage.getItem("loginStatus") === "false") {
      navigate("/login");
    }
    setisCreatePostClicked(true);
    const data = {
      title,
      summary,
      content,
      category,
      files,
    };
    let response = await fetch(`${API_BASE_URL.base_url}/post/createPost`, {
      method: "post",
      body: JSON.stringify(data),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    await response.json();

    navigate("/");
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
            {/* <TextField type="file" onChange={handleFile} /> */}

            <TextField
              placeholder="Category"
              value={category}
              onChange={handleCategory}
            />
          </Box>
          <ReactQuill value={content} onChange={handleContent} />
          <label
            style={{
              width: "14.3vw",
              height: "18vh",
              border: "1px dashed gray",
              borderRadius: "20px",
              margin: "10px 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {!files ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  type="file"
                  onChange={handleUploadFile}
                  sx={{ display: "none" }}
                  hidden
                />
                {!photoLoader ? (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CloudUploadIcon sx={{ fontSize: "50px" }} />
                    Upload
                  </Box>
                ) : (
                  <CircularProgress />
                )}
              </Box>
            ) : (
              <img
                src={files}
                style={{
                  width: "14.3vw",
                  height: "18vh",
                  borderRadius: "20px",
                }}
                alt="post"
              />
            )}
          </label>
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
