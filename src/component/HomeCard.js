import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlineTwoToneIcon from "@mui/icons-material/ChatBubbleOutlineTwoTone";
import ShareIcon from "@mui/icons-material/Share";

import { Context } from "../App";
import ShareButtons from "./ShareButtons";
import API_BASE_URL from "../config";

const HomeCard = ({ item }) => {
  const { userDetail } = useContext(Context);
  const navigate = useNavigate();

  const [isliked, setIsLiked] = useState(
    item?.likes?.includes(userDetail?.userId)
  );

  const [isShareClicked, setIsShareClicked] =
    useState(false);

  // ============================================
  // Navigate to author profile
  // ============================================

  const handleCreatedBy = (data) => {
    navigate("/user-profile/" + data);
  };

  // ============================================
  // Navigate to post
  // ============================================

  const handlePost = (data) => {
    navigate(`/post/${data}`);
  };

  // ============================================
  // Like Post
  // ============================================

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL.base_url}/post/like/${item?._id}?email=${userDetail?.email}&isLike=${isliked}`,
        {
          method: "PUT",
          headers: {
            authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      );

      const result = await response.json();

      if (
        result.message ===
        "Invalid access, Please login first"
      ) {
        navigate("/login");
        return;
      }

      if (result.message === "liked") {
        setIsLiked(true);
      } else if (
        result.message === "like removed"
      ) {
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error while liking post:", error);
    }
  };

  // ============================================
  // Share
  // ============================================

  const handleShare = () => {
    setIsShareClicked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        backgroundColor: "#fff",

        borderRadius: "12px",

        overflow: "hidden",

        border: "1px solid #eeeeee",

        boxShadow:
          "0 4px 15px rgba(0, 0, 0, 0.08)",

        transition:
          "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: {
            xs: "none",
            sm: "translateY(-4px)",
          },

          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.14)",
        },
      }}
    >
      {/* ==========================================
          IMAGE
      =========================================== */}

      <Box
        sx={{
          width: "100%",

          aspectRatio: "16 / 9",

          overflow: "hidden",

          cursor: "pointer",

          backgroundColor: "#f5f5f5",
        }}
        onClick={() => handlePost(item?._id)}
      >
        <Box
          component="img"
          src={item?.cover}
          alt={item?.title || "post"}
          sx={{
            width: "100%",
            height: "100%",

            objectFit: "cover",

            display: "block",

            transition:
              "transform 0.35s ease",

            "&:hover": {
              transform: {
                xs: "none",
                sm: "scale(1.04)",
              },
            },
          }}
        />
      </Box>

      {/* ==========================================
          CONTENT
      =========================================== */}

      <Box
        sx={{
          padding: {
            xs: "14px",
            sm: "16px",
            md: "18px",
          },

          flex: 1,

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}

        <Typography
          component="h2"
          onClick={() => handlePost(item?._id)}
          sx={{
            fontSize: {
              xs: "18px",
              sm: "19px",
              md: "20px",
            },

            lineHeight: 1.3,

            fontWeight: 700,

            color: "#222",

            cursor: "pointer",

            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,

            overflow: "hidden",

            minHeight: {
              xs: "47px",
              sm: "50px",
            },

            "&:hover": {
              color: "#3333cc",
            },
          }}
        >
          {item?.title}
        </Typography>

        {/* Author */}

        <Typography
          onClick={() =>
            handleCreatedBy(item?.author)
          }
          sx={{
            marginTop: "8px",

            fontSize: {
              xs: "12px",
              sm: "13px",
            },

            fontWeight: 600,

            color: "#555",

            cursor: "pointer",

            width: "fit-content",

            "&:hover": {
              color: "#3333cc",
            },
          }}
        >
          by @{item?.author?.split("@")[0]}
        </Typography>

        {/* Category */}

        <Typography
          sx={{
            marginTop: "7px",

            fontSize: {
              xs: "12px",
              sm: "13px",
            },

            color: "#777",

            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,

            overflow: "hidden",
          }}
        >
          Category: {item?.category}
        </Typography>

        {/* Summary */}

        <Typography
          onClick={() => handlePost(item?._id)}
          sx={{
            marginTop: "10px",

            color: "#555",

            fontSize: {
              xs: "14px",
              sm: "14px",
              md: "15px",
            },

            lineHeight: 1.6,

            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,

            overflow: "hidden",

            cursor: "pointer",
          }}
        >
          {item?.summary}
        </Typography>
      </Box>

      {/* ==========================================
          ACTIONS
      =========================================== */}

      <Box
        sx={{
          padding: {
            xs: "10px 14px 14px",
            sm: "10px 16px 16px",
          },

          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          borderTop:
            "1px solid #f0f0f0",
        }}
      >
        {/* Like + Comment */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: {
              xs: "4px",
              sm: "8px",
            },
          }}
        >
          {/* Like */}

          <IconButton
            onClick={handleLike}
            aria-label={
              isliked
                ? "Unlike post"
                : "Like post"
            }
            sx={{
              padding: {
                xs: "6px",
                sm: "7px",
              },

              color: isliked
                ? "#ff002b"
                : "gray",

              "&:hover": {
                backgroundColor: isliked
                  ? "rgba(255, 0, 43, 0.08)"
                  : "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            {isliked ? (
              <FavoriteOutlinedIcon
                sx={{
                  fontSize: {
                    xs: "27px",
                    sm: "30px",
                  },
                }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  fontSize: {
                    xs: "27px",
                    sm: "30px",
                  },
                }}
              />
            )}
          </IconButton>

          {/* Comment */}

          <IconButton
            onClick={() =>
              navigate(`/post/${item?._id}`)
            }
            aria-label="View comments"
            sx={{
              padding: {
                xs: "6px",
                sm: "7px",
              },

              color: "gray",

              "&:hover": {
                color: "#333",
                backgroundColor:
                  "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <ChatBubbleOutlineTwoToneIcon
              sx={{
                fontSize: {
                  xs: "26px",
                  sm: "29px",
                },
              }}
            />
          </IconButton>
        </Box>

        {/* Share */}

        <Box
          sx={{
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleShare}
            aria-label="Share post"
            sx={{
              padding: {
                xs: "6px",
                sm: "7px",
              },

              color: "gray",

              "&:hover": {
                color: "#333",
                backgroundColor:
                  "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <ShareIcon
              sx={{
                fontSize: {
                  xs: "25px",
                  sm: "28px",
                },
              }}
            />
          </IconButton>

          {isShareClicked && (
            <Box
              sx={{
                position: "absolute",

                bottom: "45px",

                right: 0,

                zIndex: 20,

                backgroundColor: "#fff",

                borderRadius: "8px",

                boxShadow:
                  "0 5px 20px rgba(0,0,0,0.15)",

                padding: "6px",

                minWidth: "150px",
              }}
            >
              <ShareButtons
                shareUrl={`https://exquisite-mousse-a08a25.netlify.app/post/${item?._id}`}
                title={item?.title}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard;