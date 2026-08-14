import {
  Avatar,
  Box,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useNavigate } from "react-router-dom";
import "../style/comments.css";
import UserDetail from "./UserDetail";
import API_BASE_URL from "../config";

const Comment = (props) => {
  const [commentAdded, setCommentAdded] =
    useState(false);

  const navigate = useNavigate();

  const { postId, userEmail } = props;

  const [comments, setComments] = useState({});

  const [isHovered, setHovered] =
    useState(false);

  const [selectedComment, setSelectedComment] =
    useState(null);

  const [isFocused, setIsFocused] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const keys = Object.keys(comments || {});

  // ============================================
  // Get Comments
  // ============================================

  useEffect(() => {
    fetch(
      `${API_BASE_URL.base_url}/post/getComments/${postId}`,
      {
        method: "GET",

        headers: {
          "Content-Type":
            "application/json",

          authorization:
            "Bearer " +
            localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setComments(result?.comments || {});
        setCommentAdded(false);
        setMessage("");
      })
      .catch((error) => {
        console.error(
          "Failed to fetch comments:",
          error
        );
      });
  }, [commentAdded, postId]);

  // ============================================
  // Message
  // ============================================

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  // ============================================
  // Enter Key
  // ============================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ============================================
  // Send Comment
  // ============================================

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL.base_url}/post/addComment`,
        {
          method: "POST",

          body: JSON.stringify({
            comment: trimmedMessage,
            email: userEmail,
            postId,
          }),

          headers: {
            "Content-Type":
              "application/json",

            authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();

      if (
        result.message ===
        "You are not logged in, login first"
      ) {
        navigate("/login");
        return;
      }

      setMessage("");
      setCommentAdded(true);
    } catch (error) {
      console.error(
        "Failed to add comment:",
        error
      );
    }
  };

  // ============================================
  // Comment Hover
  // ============================================

  const handleMouseOver = (id) => {
    setHovered(true);
    setSelectedComment(id);
  };

  const handleMouseOut = () => {
    setHovered(false);
    setSelectedComment(null);
  };

  // ============================================
  // Input Focus
  // ============================================

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "90%",
          md: "80%",
          lg: "70%",
        },

        maxWidth: "850px",

        margin: {
          xs: "20px auto",
          sm: "25px auto",
          md: "30px auto",
        },

        padding: {
          xs: "14px",
          sm: "18px",
          md: "20px",
        },

        boxSizing: "border-box",

        border:
          keys.length > 0
            ? "1px solid #e0e0e0"
            : "none",

        borderRadius: "12px",

        backgroundColor: "#fff",

        boxShadow:
          keys.length > 0
            ? "0 3px 15px rgba(0, 0, 0, 0.05)"
            : "none",
      }}
    >
      {/* ========================================
          COMMENTS
      ========================================= */}

      {keys.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            gap: {
              xs: "14px",
              sm: "18px",
            },

            marginBottom: "20px",
          }}
        >
          {keys.map((item) => {
            const comment = comments[item];

            return (
              <Box
                key={item}
                sx={{
                  display: "flex",

                  alignItems: "flex-start",

                  gap: {
                    xs: "10px",
                    sm: "14px",
                  },

                  position: "relative",
                }}
              >
                {/* Avatar */}

                <Box
                  sx={{
                    position: "relative",
                    flexShrink: 0,
                  }}
                  onMouseEnter={() =>
                    handleMouseOver(
                      comment?._id
                    )
                  }
                  onMouseLeave={
                    handleMouseOut
                  }
                >
                  <Avatar
                    sx={{
                      width: {
                        xs: "32px",
                        sm: "35px",
                      },

                      height: {
                        xs: "32px",
                        sm: "35px",
                      },

                      cursor: "pointer",

                      backgroundColor:
                        "#e8e8e8",

                      color: "#555",

                      fontSize: "14px",
                    }}
                    className="comment-avatar"
                  />

                  {/* User Detail */}

                  {isHovered &&
                    comment?._id ===
                      selectedComment && (
                      <Box
                        sx={{
                          position:
                            "absolute",

                          top: "40px",
                          left: 0,

                          zIndex: 20,
                        }}
                      >
                        <UserDetail
                          UserDetail={
                            comment?.user
                          }
                        />
                      </Box>
                    )}
                </Box>

                {/* Comment Content */}

                <Box
                  sx={{
                    minWidth: 0,

                    flex: 1,

                    padding: {
                      xs: "8px 10px",
                      sm: "9px 12px",
                    },

                    borderRadius:
                      "10px",

                    backgroundColor:
                      "#f7f7f7",
                  }}
                >
                  <Typography
                    sx={{
                      margin: 0,

                      fontSize: {
                        xs: "13px",
                        sm: "14px",
                      },

                      lineHeight: 1.5,

                      color: "#333",

                      overflowWrap:
                        "anywhere",
                    }}
                  >
                    {comment?.comments}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {/* ========================================
          ADD COMMENT
      ========================================= */}

      <Box
        sx={{
          width: "100%",

          display: "flex",

          alignItems: "center",

          padding: {
            xs: "5px 6px 5px 12px",
            sm: "6px 8px 6px 14px",
          },

          boxSizing: "border-box",

          border: isFocused
            ? "2px solid #3333cc"
            : "1px solid #d5d5d5",

          borderRadius: "12px",

          gap: {
            xs: "6px",
            sm: "10px",
          },

          backgroundColor: "#fff",

          transition:
            "border-color 0.2s ease, box-shadow 0.2s ease",

          boxShadow: isFocused
            ? "0 0 0 3px rgba(51, 51, 204, 0.08)"
            : "none",
        }}
      >
        <InputBase
          placeholder="Add a comment..."
          fullWidth
          multiline
          maxRows={4}
          onChange={handleMessage}
          value={message}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            fontSize: {
              xs: "14px",
              sm: "15px",
            },

            lineHeight: 1.5,

            "& input::placeholder":
              {
                color: "#999",
                opacity: 1,
              },
          }}
        />

        <Box
          onClick={handleSendMessage}
          sx={{
            width: {
              xs: "38px",
              sm: "42px",
            },

            height: {
              xs: "38px",
              sm: "42px",
            },

            flexShrink: 0,

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            borderRadius: "50%",

            backgroundColor:
              message.trim()
                ? "#3333cc"
                : "#eeeeee",

            color: message.trim()
              ? "#fff"
              : "#888",

            cursor: message.trim()
              ? "pointer"
              : "default",

            transition:
              "all 0.2s ease",

            "&:hover": {
              backgroundColor:
                message.trim()
                  ? "#2929a8"
                  : "#e5e5e5",
            },
          }}
        >
          <SendTwoToneIcon
            sx={{
              fontSize: {
                xs: "20px",
                sm: "22px",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;