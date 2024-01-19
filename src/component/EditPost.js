import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import CircularProgress from "@mui/material/CircularProgress";
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
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchData = async () => {
    fetch(`https://blog-backend-i14c.onrender.com/post/${id}`, {
      method: "get",
    }).then((response) => {
      response.json().then((result) => {
        if (result) {
          setLoader(false);
        }
        if (result) {
          setPostInfo(result);
          setTitle(result.title);
          setSummary(result.summary);
          setContent(result.content);
        }
      });
    });
  }, [id]);

  console.log("postinfo", postInfo);
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

  let handleFile = (e) => {
    setFiles(e.target.files);
  };

  const handleEditPost = async () => {
    setIsClickUpdate(true);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("category", category);
    data.set("content", content);
    if (files?.[0]) data.set("files", files[0]);

    let response = await fetch(
      `https://blog-backend-i14c.onrender.com/post/edit/${id}`,
      {
        method: "put",
        body: data,
        credentials: "include",
      }
    );

    if (response.ok) {
      navigate(`/`);
    }
  };
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
      <Box>
        <Box sx={{ width: "50vw", margin: "0 auto" }}>
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
            <TextField type="file" onChange={handleFile} />
            <TextField
              placeholder="Category"
              value={category}
              onChange={handleCategory}
            />
          </Box>
          <ReactQuill value={content} onChange={handleContent} />
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
                  sx={{ color: "red", marginRight: "10px", size: "small" }}
                />{" "}
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPost;
