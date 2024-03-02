import { Box, Typography } from "@mui/material";
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
    item && item?.likes?.includes(userDetail?.userId)
  );
  const [isShareClicked, setIsShareClicked] = useState(false);
  const handleCreatedBy = (data) => {
    navigate("/user-profile/" + data);
  };

  const handlePost = (data) => {
    navigate(`/post/${data}`);
  };
  const handleLike = async () => {
    const response = await fetch(
      `${API_BASE_URL.base_url}/post/like/${item?._id}?email=${userDetail?.email}&isLike=${isliked}`,
      {
        method: "put",
        // credentials: "include",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const result = await response.json();
    if (result.message === "Invalid access, Please login first") {
      navigate("/login");
    }
    if (result.message === "liked") setIsLiked(true);
    else if (result.message === "like removed") {
      setIsLiked(false);
    }
  };

  const handleShare = () => {
    setIsShareClicked(!isShareClicked);
  };
  return (
    <Box
      sx={{
        width: "20vw",
        boxShadow: "2px 2px 20px gray",
        borderRadius: "8px",
        height: "48vh",
        ":hover": {
          boxShadow: "3px 3px 25px black",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      key={item._id}
    >
      <Box>
        <img
          src={item?.cover}
          style={{
            width: "20vw",
            height: "23vh",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            cursor: "pointer",
          }}
          alt="post"
          onClick={() => handlePost(item._id)}
        />

        <Box sx={{ margin: "10px 20px" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              ":hover": { color: " #3333cc" },
            }}
            onClick={() => handlePost(item._id)}
          >
            {item?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              // ":hover":{
              //     fontSize:"13px"
              // }
            }}
            onClick={() => handleCreatedBy(item?.author)}
          >
            by @{item?.author.split("@")[0]}
          </Typography>
          <Typography sx={{ color: "gray", fontSize: "15px", margin: "5px 0" }}>
            Category: {item?.category}
          </Typography>
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Adjust the number of lines before ellipsis
                cursor: "pointer",
              }}
              onClick={() => handlePost(item._id)}
            >
              {item?.summary}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "0 0 20px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8vw",
        }}
      >
        <Box
          sx={{
            width: "8vw",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {!isliked ? (
            <FavoriteBorderIcon
              sx={{
                fontSize: "35px",
                cursor: "pointer",
                color: "gray",
                ":hover": { color: "black" },
              }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteOutlinedIcon
              fontSize="large"
              onClick={handleLike}
              sx={{ color: "#ff002b", fontSize: "35px", cursor: "pointer" }}
            />
          )}
          <ChatBubbleOutlineTwoToneIcon
            sx={{
              fontSize: "33px",
              cursor: "pointer",
              marginRight: "30px",
              color: "gray",
              ":hover": { color: "black" },
            }}
            onClick={() => navigate(`/post/${item._id}`)}
          />
        </Box>
        <Box sx={{ position: "relative" }}>
          <ShareIcon
            sx={{
              fontSize: "30px",
              cursor: "pointer",
              color: "gray",
              ":hover": { color: "black" },
            }}
            onClick={handleShare}
          />
          {isShareClicked ? (
            <ShareButtons
              shareUrl={`${"https://exquisite-mousse-a08a25.netlify.app"}/post/${
                item._id
              }`}
              title={item.title}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard;
