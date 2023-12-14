import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Box, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
const EditPost = () => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [postInfo, setPostInfo] = useState({});
  console.log("files", files, id);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let response = await fetch(`/post/${id}`, {
      method: "get",
    });

    let result = await response.json();
    setPostInfo(result);
  };
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
  let handleContent = (newContenet) => {
    setContent(newContenet);
  };

  let handleFile = (e) => {
    setFiles(e.target.files);
  };

  const handleEditPost = () =>{

  }
  return (
    <Box>
      <Nav />
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
          </Box>
          <ReactQuill value={content} onChange={handleContent} />
          <Button
            sx={{ marginTop: "10px", width: "50vw" }}
            variant="contained"
            size="medium"
            onClick={handleEditPost}
          >
            Edit Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPost;
