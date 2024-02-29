import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import CircularProgress from "@mui/material/CircularProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import API_BASE_URL from "../config";
const EditPost = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [isClickedUpdate, setIsClickUpdate] = useState(false);
  const [photoLoader, setPhotoLoader] = useState(false);
  const [defaultImage, setDefaultImage] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchData = async () => {
    fetch(`${API_BASE_URL.base_url}/post/${id}`, {
      method: "get",
    }).then((response) => {
      response.json().then((result) => {
        if (result) {
          setLoader(false);
        }
        if (result) {
          setPostInfo(result.data);
          setTitle(result.data.title);
          setSummary(result.data.summary);
          setContent(result.data.content);
          setCategory(result.data.category);
          setDefaultImage(result.data.cover);
        }
      });
    });
  }, [id]);

  let handleTitle = (e) => {
    setTitle(e.target.value);
  };

  let handleSummary = (e) => {
    if (postInfo) {
      setSummary(postInfo.summary);
    }

    setSummary(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  let handleContent = (newContenet) => {
    setContent(newContenet);
  };

  // let handleFile = (e) => {
  //   setFiles(e.target.files);
  // };

  const handleEditPost = async () => {
    setIsClickUpdate(true);
    let data = {};
    data["title"] = title;
    data["summary"] = summary;
    data["category"] = category;
    data["content"] = content;
    if(files) data["files"] = files
    else setFiles(defaultImage)

    let response = await fetch(`${API_BASE_URL.base_url}/post/edit/${id}`, {
      method: "put",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      navigate(`/`);
    }
  };
  const handleUploadFile = async (e) => {
    setPhotoLoader(true);
    let files = e.target.files;
    const data = new FormData();
    data.set("files", files[0]);

    let response = await fetch(`${API_BASE_URL.base_url}/post/uploadPhoto`, {
      method: "post",
      body: data,
      credentials: "include",
    });

    let result = await response.json();
    setPhotoLoader(false);
    setFiles(result.url);
  };

  return (
    <Box>
      <Nav />
      {loader ? (
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
      ) : (
        <Box>
          <Box sx={{ width: "50vw", margin: "0 auto" }}>
            <h2
              style={{
                borderBottom: "1px solid gray",
                textAlign: "center",
                paddingBottom: "10px",
              }}
            >
              Edit Post
            </h2>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "23vh",
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
              sx={{ marginTop: "10px", width: "50vw", marginBottom: "50px" }}
              variant="contained"
              size="medium"
              onClick={handleEditPost}
            >
              {!isClickedUpdate ? (
                "Update Post"
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress
                    style={{
                      color: "white",
                      marginRight: "10px",
                      width: "25px",
                      height: "25px",
                    }}
                  />{" "}
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EditPost;
