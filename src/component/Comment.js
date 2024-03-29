import { Avatar, Box, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useNavigate } from "react-router-dom";
import "../style/comments.css";
import UserDetail from "./UserDetail";
import API_BASE_URL from "../config";

const Comment = (props) => {
  const [commentAdded, setCommentAdded] = useState(false);
  const navigate = useNavigate();
  const { postId, userEmail } = props;
  const [comments, setComments] = useState({});
  const [isHovered, setHovered] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const keys = Object.keys(comments);
  let style;
  if (keys.length > 0) {
    style = {
      border: "1px solid gray",
      width: "70%",
      marginLeft: "30px",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "30px",
    };
  } else {
    style = {
      width: "70%",
      marginLeft: "30px",
      borderRadius: "10px",
      padding: "20px",
    };
  }
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { postId } = props;
    fetch(`${API_BASE_URL.base_url}/post/getComments/${postId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      // credentials: "include",
    }).then((response) => {
      response.json().then((result) => {
        setComments(result.comments);
        setCommentAdded(false);
        setMessage("");
      });
    });
  }, [commentAdded, props]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "")
      try {
        fetch(`${API_BASE_URL.base_url}/post/addComment`, {
          method: "post",
          // credentials: "include",
          body: JSON.stringify({ comment: message, email: userEmail, postId }),
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          response.json().then((result) => {
            if (result.message === "You are not logged in, login first") {
              return navigate("/login");
            }
            setCommentAdded(true);
          });
        });
        setMessage("");
      } catch (error) {
        console.log(error);
      }
  };

  const handleMouseOver = (e, id) => {
    setHovered(true);
    setSelectedComment(id);
  };

  const handleMouseOut = () => {
    setHovered(false);
    setSelectedComment(null);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div style={style}>
      {keys.length > 0 &&
        keys.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "start",
                marginBottom: "20px",
                lineHeight: "25px",
                position: "relative",
              }}
              key={item}
            >
              <Box
                onMouseEnter={(e) => handleMouseOver(e, comments[item]._id)}
                onMouseLeave={handleMouseOut}
              >
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  className="comment-avatar"
                />
                {isHovered && comments[item]._id === selectedComment && (
                  <UserDetail UserDetail={comments[item].user} />
                )}
              </Box>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <p style={{ margin: "0" }}>{comments[item].comments}</p>
              </div>
            </div>
          );
        })}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "5px 10px",
          borderRadius: "8px",
          marginTop: "20px",
          border:isFocused ? "2px solid blue" :"1px solid gray",
          gap: "20px",
        }}
        
      >
        <InputBase
          placeholder="Add comment..."
          fullWidth
          onChange={handleMessage}
          value={message}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SendTwoToneIcon
          sx={{
            background: "#e6e6e6",
            borderRadius: "50%",
            padding: "10px",
            textAlign: "center",
            ":hover": {
              background: "#ddd",
            },
            cursor: "pointer",
          }}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Comment;
