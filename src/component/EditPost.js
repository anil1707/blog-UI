import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import API_BASE_URL from "../config";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState("");

  const [postInfo, setPostInfo] = useState({});
  const [loader, setLoader] = useState(true);

  const [isClickedUpdate, setIsClickUpdate] =
    useState(false);

  const [photoLoader, setPhotoLoader] =
    useState(false);

  const [defaultImage, setDefaultImage] =
    useState("");

  // ============================================
  // Get Post
  // ============================================

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoader(true);

        const response = await fetch(
          `${API_BASE_URL.base_url}/post/${id}`,
          {
            method: "GET",
          }
        );

        const result = await response.json();

        if (result?.data) {
          const post = result.data;

          setPostInfo(post);

          setTitle(post.title || "");
          setSummary(post.summary || "");
          setContent(post.content || "");
          setCategory(post.category || "");

          setDefaultImage(post.cover || "");

          // Show existing image initially
          setFiles(post.cover || "");
        }
      } catch (error) {
        console.error(
          "Failed to fetch post:",
          error
        );
      } finally {
        setLoader(false);
      }
    };

    fetchPost();
  }, [id]);

  // ============================================
  // Input Handlers
  // ============================================

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSummary = (e) => {
    setSummary(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleContent = (newContent) => {
    setContent(newContent);
  };

  // ============================================
  // Upload Image
  // ============================================

  const handleUploadFile = async (e) => {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      setPhotoLoader(true);

      const data = new FormData();

      data.set("files", selectedFile);

      const response = await fetch(
        `${API_BASE_URL.base_url}/post/uploadPhoto`,
        {
          method: "POST",

          body: data,

          headers: {
            authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();

      setFiles(result.url);
    } catch (error) {
      console.error(
        "Image upload failed:",
        error
      );
    } finally {
      setPhotoLoader(false);
    }
  };

  // ============================================
  // Update Post
  // ============================================

  const handleEditPost = async () => {
    try {
      setIsClickUpdate(true);

      const data = {
        title,
        summary,
        category,
        content,

        // Use new image if uploaded,
        // otherwise keep existing image.
        files: files || defaultImage,
      };

      const response = await fetch(
        `${API_BASE_URL.base_url}/post/edit/${id}`,
        {
          method: "PUT",

          body: JSON.stringify(data),

          headers: {
            "Content-Type":
              "application/json",

            authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        navigate(`/post/${id}`);
      } else {
        console.error(
          "Failed to update post"
        );

        setIsClickUpdate(false);
      }
    } catch (error) {
      console.error(
        "Update post failed:",
        error
      );

      setIsClickUpdate(false);
    }
  };

  // ============================================
  // Loading
  // ============================================

  if (loader) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#fafafa",
        }}
      >
        <Nav />

        <Box
          sx={{
            minHeight: "50vh",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (
    <Box
      sx={{
        width: "100%",

        minHeight: "100vh",

        overflowX: "hidden",

        backgroundColor: "#fafafa",
      }}
    >
      <Nav />

      {/* ==========================================
          MAIN CONTAINER
      =========================================== */}

      <Box
        sx={{
          width: {
            xs: "calc(100% - 32px)",
            sm: "90%",
            md: "80%",
            lg: "900px",
          },

          maxWidth: "900px",

          margin: {
            xs: "25px auto 40px",
            sm: "35px auto 50px",
            md: "45px auto 60px",
          },
        }}
      >
        {/* ========================================
            PAGE TITLE
        ========================================= */}

        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
            },

            fontWeight: 700,

            color: "#222",

            textAlign: "center",

            paddingBottom: "15px",

            marginBottom: {
              xs: "18px",
              sm: "24px",
            },

            borderBottom:
              "1px solid #e0e0e0",
          }}
        >
          Edit Post
        </Typography>

        {/* ========================================
            BASIC DETAILS
        ========================================= */}

        <Box
          sx={{
            display: "flex",

            flexDirection: "column",

            gap: {
              xs: "14px",
              sm: "18px",
            },

            marginBottom: {
              xs: "20px",
              sm: "24px",
            },
          }}
        >
          {/* Title */}

          <TextField
            fullWidth
            label="Title"
            placeholder="Enter post title"
            value={title}
            onChange={handleTitle}
          />

          {/* Summary */}

          <TextField
            fullWidth
            label="Summary"
            placeholder="Enter post summary"
            value={summary}
            onChange={handleSummary}
            multiline
            minRows={2}
            maxRows={4}
          />

          {/* Category */}

          <TextField
            fullWidth
            label="Category"
            placeholder="Enter category"
            value={category}
            onChange={handleCategory}
          />
        </Box>

        {/* ========================================
            RICH TEXT EDITOR
        ========================================= */}

        <Box
          sx={{
            width: "100%",

            marginBottom: {
              xs: "20px",
              sm: "24px",
            },

            "& .ql-toolbar": {
              borderTopLeftRadius: "8px",

              borderTopRightRadius: "8px",

              backgroundColor: "#fafafa",

              overflowX: "auto",
            },

            "& .ql-container": {
              minHeight: {
                xs: "250px",
                sm: "300px",
                md: "350px",
              },

              fontSize: {
                xs: "14px",
                sm: "15px",
              },

              borderBottomLeftRadius:
                "8px",

              borderBottomRightRadius:
                "8px",

              backgroundColor: "#fff",
            },

            "& .ql-editor": {
              minHeight: {
                xs: "250px",
                sm: "300px",
                md: "350px",
              },
            },
          }}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContent}
          />
        </Box>

        {/* ========================================
            COVER IMAGE
        ========================================= */}

        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "15px",

              fontWeight: 600,

              marginBottom: "8px",
            }}
          >
            Cover Image
          </Typography>

          <Box
            component="label"
            sx={{
              width: {
                xs: "100%",
                sm: "280px",
                md: "300px",
              },

              height: {
                xs: "180px",
                sm: "190px",
                md: "200px",
              },

              border:
                "2px dashed #bdbdbd",

              borderRadius: "12px",

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              alignItems: "center",

              cursor: "pointer",

              overflow: "hidden",

              backgroundColor: "#fff",

              transition:
                "border-color 0.2s ease, background-color 0.2s ease",

              "&:hover": {
                borderColor: "#3333cc",

                backgroundColor:
                  "#fafaff",
              },
            }}
          >
            {/* Hidden file input */}

            <input
              type="file"
              accept="image/*"
              onChange={handleUploadFile}
              style={{
                display: "none",
              }}
            />

            {/* Uploading */}

            {photoLoader ? (
              <CircularProgress />

            ) : files ? (
              /* Existing / New Image */

              <Box
                component="img"
                src={files}
                alt="post"
                sx={{
                  width: "100%",

                  height: "100%",

                  objectFit: "cover",

                  display: "block",
                }}
              />

            ) : (
              /* Upload */

              <Box
                sx={{
                  display: "flex",

                  flexDirection:
                    "column",

                  justifyContent:
                    "center",

                  alignItems: "center",

                  gap: "6px",

                  color: "#666",
                }}
              >
                <CloudUploadIcon
                  sx={{
                    fontSize: {
                      xs: "42px",
                      sm: "48px",
                    },

                    color: "#555",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "14px",

                    fontWeight: 500,
                  }}
                >
                  Click to upload
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",

                    color: "#999",
                  }}
                >
                  JPG, PNG, JPEG
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* ========================================
            UPDATE BUTTON
        ========================================= */}

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleEditPost}
          disabled={isClickedUpdate}
          sx={{
            marginTop: "10px",

            marginBottom: "20px",

            height: {
              xs: "46px",
              sm: "48px",
            },

            borderRadius: "8px",

            textTransform: "none",

            fontSize: {
              xs: "15px",
              sm: "16px",
            },

            fontWeight: 600,

            backgroundColor:
              "#3333cc",

            "&:hover": {
              backgroundColor:
                "#2929a8",
            },
          }}
        >
          {!isClickedUpdate ? (
            "Update Post"
          ) : (
            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: "10px",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#fff",

                  width:
                    "23px !important",

                  height:
                    "23px !important",
                }}
              />

              <Typography
                component="span"
                sx={{
                  color: "#fff",

                  fontSize: "14px",
                }}
              >
                Updating...
              </Typography>
            </Box>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;