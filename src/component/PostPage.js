import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { formatISO9075 } from "date-fns";
import "../App.css";
import { Context } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import Comment from "./Comment";
import API_BASE_URL from "../config";

const PostPage = () => {
  const { userDetail } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch(`${API_BASE_URL.base_url}/post/${params.id}`, {
      method: "get",
      // credentials: "include",
    }).then((response) => {
      response.json().then((result) => {
        if (result) {
          setLoader(false);
        }
        setPostInfo(result);
      });
    });
  }, [params.id]);

  const handleEditPost = () => {
    if (userDetail?.email === postInfo?.data?.author) {
      navigate("/edit/" + params.id);
      // setIsLoggedIn(true);
    } else {
      // setIsLoggedIn(false);
    }
  };

  const handleDelete = async () => {
    let response = await fetch(
      `${API_BASE_URL.base_url}/post/delete/${params.id}`,
      {
        method: "delete",
        // credentials: "include",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    await response.json();
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreatedBy = (data) => {
    navigate("/user-profile/" + data);
  };
  if (!postInfo) return "";
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
      {!loader && (
        <Box sx={{ width: "80vw", margin: "0 auto" }}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", margin: "0 0 5px" }}
          >
            {postInfo?.data?.title}
          </Typography>
          {postInfo?.data?.createdAt && (
            <Typography
              sx={{ textAlign: "center", fontSize: "1rem", color: "#aaa" }}
            >
              {formatISO9075(new Date(postInfo?.data?.createdAt))}
            </Typography>
          )}
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: ".8rem",
              fontWeight: "bold",
              cursor: "pointer ",
            }}
            onClick={() => handleCreatedBy(postInfo?.data?.author)}
          >
            by @{postInfo?.data?.author.split("@")[0]}
          </Typography>
          <Box
            sx={{
              width: "80vw",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {userDetail?.email === postInfo?.data?.author && (
              <Box
                sx={{
                  width: "9vw",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleEditPost}
                  size="small"
                >
                  Edit
                </Button>
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    width="3vw"
                    size="small"
                    onClick={handleOpen}
                    // onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="confimation-model"
                        variant="h6"
                        component="h2"
                      >
                        Are You sure want to delete?
                      </Typography>
                      <Box
                        sx={{
                          paddingTop: "50px",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{ marginRight: "20px", width: "30%" }}
                          onClick={handleClose}
                        >
                          No
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ width: "30%" }}
                          onClick={handleDelete}
                        >
                          Yes
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Box>
            )}
          </Box>
          <img
            style={{
              width: "80vw",
              maxHeight: "400px",
              overflow: "hidden",
              objectFit: "cover",
              objectPosition: "center center",
            }}
            src={postInfo?.data?.cover}
            alt="post"
          />
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo?.data.content }}
          />
          <h2 style={{ color: "gray" }}>Comments: </h2>
          <Comment postId={params.id} userEmail={userDetail?.email} />
        </Box>
      )}
    </Box>
  );
};

export default PostPage;
