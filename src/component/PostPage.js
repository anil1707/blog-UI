import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Nav from "./Nav";
import { formatISO9075 } from "date-fns";
import "../App.css";
import { Context } from "../App";
import Comment from "./Comment";
import API_BASE_URL from "../config";

const PostPage = () => {
  const { userDetail } = useContext(Context);

  const navigate = useNavigate();
  const params = useParams();

  const [postInfo, setPostInfo] =
    useState({});

  const [loader, setLoader] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  // ============================================
  // Get Post
  // ============================================

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoader(true);

        const response = await fetch(
          `${API_BASE_URL.base_url}/post/${params.id}`,
          {
            method: "GET",
          }
        );

        const result = await response.json();

        setPostInfo(result);
      } catch (error) {
        console.error(
          "Failed to fetch post:",
          error
        );
      } finally {
        setLoader(false);
      }
    };

    getPost();
  }, [params.id]);

  // ============================================
  // Edit Post
  // ============================================

  const handleEditPost = () => {
    if (
      userDetail?.email ===
      postInfo?.data?.author
    ) {
      navigate("/edit/" + params.id);
    }
  };

  // ============================================
  // Delete Post
  // ============================================

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL.base_url}/post/delete/${params.id}`,
        {
          method: "DELETE",

          headers: {
            authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      );

      await response.json();

      setOpen(false);

      navigate("/");
    } catch (error) {
      console.error(
        "Failed to delete post:",
        error
      );
    }
  };

  // ============================================
  // Modal
  // ============================================

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ============================================
  // Author
  // ============================================

  const handleCreatedBy = (data) => {
    navigate("/user-profile/" + data);
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
  // No Post
  // ============================================

  if (!postInfo?.data) {
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

            padding: "20px",
          }}
        >
          <Typography
            sx={{
              color: "gray",
              fontSize: {
                xs: "18px",
                sm: "20px",
              },
            }}
          >
            Post not found
          </Typography>
        </Box>
      </Box>
    );
  }

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
          ARTICLE CONTAINER
      =========================================== */}

      <Box
        sx={{
          width: {
            xs: "calc(100% - 24px)",
            sm: "90%",
            md: "85%",
            lg: "1000px",
          },

          maxWidth: "1000px",

          margin: {
            xs: "20px auto 40px",
            sm: "30px auto 50px",
            md: "40px auto 60px",
          },
        }}
      >
        {/* ========================================
            TITLE
        ========================================= */}

        <Typography
          component="h1"
          sx={{
            textAlign: "center",

            fontWeight: 700,

            lineHeight: 1.2,

            fontSize: {
              xs: "26px",
              sm: "34px",
              md: "42px",
              lg: "46px",
            },

            color: "#222",

            margin: {
              xs: "0 5px 10px",
              sm: "0 10px 12px",
            },
          }}
        >
          {postInfo?.data?.title}
        </Typography>

        {/* ========================================
            DATE
        ========================================= */}

        {postInfo?.data?.createdAt && (
          <Typography
            sx={{
              textAlign: "center",

              fontSize: {
                xs: "12px",
                sm: "14px",
              },

              color: "#999",

              marginBottom: "6px",
            }}
          >
            {formatISO9075(
              new Date(
                postInfo?.data?.createdAt
              )
            )}
          </Typography>
        )}

        {/* ========================================
            AUTHOR
        ========================================= */}

        <Typography
          sx={{
            textAlign: "center",

            marginBottom: {
              xs: "18px",
              sm: "22px",
            },

            fontSize: {
              xs: "13px",
              sm: "14px",
            },

            fontWeight: 600,

            color: "#555",

            cursor: "pointer",

            "&:hover": {
              color: "#3333cc",
            },
          }}
          onClick={() =>
            handleCreatedBy(
              postInfo?.data?.author
            )
          }
        >
          by @
          {postInfo?.data?.author?.split(
            "@"
          )[0]}
        </Typography>

        {/* ========================================
            EDIT / DELETE BUTTONS
        ========================================= */}

        {userDetail?.email ===
          postInfo?.data?.author && (
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              gap: "10px",

              marginBottom: {
                xs: "18px",
                sm: "25px",
              },
            }}
          >
            <Button
              variant="contained"
              onClick={handleEditPost}
              size="small"
              sx={{
                minWidth: {
                  xs: "75px",
                  sm: "85px",
                },

                textTransform: "none",

                borderRadius: "6px",

                backgroundColor:
                  "#3333cc",

                "&:hover": {
                  backgroundColor:
                    "#2929a8",
                },
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleOpen}
              sx={{
                minWidth: {
                  xs: "75px",
                  sm: "85px",
                },

                textTransform: "none",

                borderRadius: "6px",
              }}
            >
              Delete
            </Button>
          </Box>
        )}

        {/* ========================================
            DELETE MODAL
        ========================================= */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="confirmation-modal-title"
          aria-describedby="confirmation-modal-description"
        >
          <Box
            sx={{
              position: "absolute",

              top: "50%",
              left: "50%",

              transform:
                "translate(-50%, -50%)",

              width: {
                xs: "calc(100% - 32px)",
                sm: "400px",
              },

              maxWidth: "400px",

              bgcolor:
                "background.paper",

              borderRadius: "12px",

              boxShadow: 24,

              padding: {
                xs: "24px 20px",
                sm: "30px",
              },

              boxSizing: "border-box",
            }}
          >
            <Typography
              id="confirmation-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "20px",
                },

                fontWeight: 600,

                color: "#222",
              }}
            >
              Are you sure you want to
              delete this post?
            </Typography>

            <Box
              sx={{
                paddingTop: "30px",

                display: "flex",

                justifyContent: "flex-end",

                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  minWidth: "80px",

                  textTransform: "none",
                }}
              >
                No
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{
                  minWidth: "80px",

                  textTransform: "none",
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* ========================================
            COVER IMAGE
        ========================================= */}

        <Box
          component="img"
          src={postInfo?.data?.cover}
          alt={
            postInfo?.data?.title ||
            "post"
          }
          sx={{
            width: "100%",

            height: {
              xs: "220px",
              sm: "320px",
              md: "400px",
            },

            display: "block",

            objectFit: "cover",

            objectPosition:
              "center center",

            borderRadius: {
              xs: "8px",
              sm: "10px",
            },

            marginBottom: {
              xs: "25px",
              sm: "35px",
            },

            boxShadow:
              "0 5px 20px rgba(0, 0, 0, 0.08)",
          }}
        />

        {/* ========================================
            POST CONTENT
        ========================================= */}

        <Box
          className="content"
          sx={{
            width: "100%",

            fontSize: {
              xs: "15px",
              sm: "16px",
              md: "17px",
            },

            lineHeight: {
              xs: 1.7,
              sm: 1.8,
            },

            color: "#333",

            overflowWrap:
              "anywhere",

            "& img": {
              maxWidth: "100%",
              height: "auto",
            },

            "& video": {
              maxWidth: "100%",
              height: "auto",
            },

            "& iframe": {
              maxWidth: "100%",
            },

            "& pre": {
              maxWidth: "100%",

              overflowX: "auto",

              padding: "12px",

              borderRadius: "8px",

              backgroundColor:
                "#f5f5f5",
            },

            "& table": {
              display: "block",

              maxWidth: "100%",

              overflowX: "auto",
            },

            "& h1": {
              fontSize: {
                xs: "26px",
                sm: "32px",
              },
            },

            "& h2": {
              fontSize: {
                xs: "22px",
                sm: "28px",
              },
            },

            "& h3": {
              fontSize: {
                xs: "19px",
                sm: "24px",
              },
            },

            "& p": {
              marginBottom: "16px",
            },

            "& a": {
              color: "#3333cc",

              overflowWrap:
                "anywhere",
            },

            "& blockquote": {
              margin: {
                xs: "15px 0",
                sm: "20px 0",
              },

              paddingLeft: "15px",

              borderLeft:
                "4px solid #3333cc",

              color: "#666",
            },
          }}
          dangerouslySetInnerHTML={{
            __html:
              postInfo?.data?.content,
          }}
        />

        {/* ========================================
            COMMENTS
        ========================================= */}

        <Box
          sx={{
            marginTop: {
              xs: "35px",
              sm: "50px",
            },

            paddingTop: {
              xs: "20px",
              sm: "25px",
            },

            borderTop:
              "1px solid #e5e5e5",
          }}
        >
          <Typography
            component="h2"
            sx={{
              color: "#555",

              fontWeight: 600,

              fontSize: {
                xs: "20px",
                sm: "24px",
              },

              marginBottom: "10px",
            }}
          >
            Comments
          </Typography>

          <Comment
            postId={params.id}
            userEmail={
              userDetail?.email
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;