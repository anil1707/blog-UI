import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import EditProfilePage from "./EditProfilePage";
import { Context } from "../App";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import HomeCard from "./HomeCard";
import API_BASE_URL from "../config";

const OtherUserProfile = () => {
  const { userDetail, getUserDetail } = useContext(Context);
  const { email } = useParams();
  const [posts, setPosts] = useState();
  const [userData, setUserDetail] = useState({});
  const isLoggedIn = localStorage.getItem("loginStatus");
  const [photoLoader, setPhotoLoader] = useState(false);
  const [pic, setPic] = useState();
  const [isDataChanged, setIsDataChanged] = useState();
  const [open, setOpen] = React.useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setIsLoadingUser(true);
    fetch(`${API_BASE_URL.base_url}/post/getPost/${email}`).then((response) => {
      response.json().then((result) => {
        setPosts(result.posts);
      });
    });

    fetch(`${API_BASE_URL.base_url}/user/otherUserProfile/${email}`).then(
      (response) => {
        response.json().then((result) => {
          setIsLoadingUser(false);
          setUserDetail(result.data);
          if (userDetail?.email === email) getUserDetail(result.data);
        });
      }
    );
     // eslint-disable-next-line
  }, [isDataChanged, email]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const handleProfilePhoto = async (e) => {
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
    setPic(result.url);
    let picReponse = await fetch(
      `${API_BASE_URL.base_url}/user/editProfilePic/${email}`,
      {
        method: "put",
        body: JSON.stringify({ pic: result.url }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await picReponse.json();
  };

  return (
    <Box>
      <Nav />
      <Box
        sx={{
          width: "90vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "30px",
          // border: "2px solid gray",
          margin: "auto",
          padding: "20px",
        }}
      >
        {!isLoadingUser ? (
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={pic ? pic : userData?.pic}
              alt="profile pic"
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
            {userDetail?.email === email && (
              <label
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "160px",
                  cursor: "pointer",
                  zIndex: 23,
                }}
              >
                {!photoLoader ? (
                  <PhotoCameraOutlinedIcon sx={{}} />
                ) : (
                  <CircularProgress
                    style={{ width: "20px", height: "20px", color: "blue" }}
                  />
                )}
                <TextField
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleProfilePhoto}
                />
              </label>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {userData?.firstName} {userData?.lastName}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  ({userData?.userName})
                </Typography>
              </Box>
              <Typography>Email: {userData.email}</Typography>
              <Typography>Posts: {posts?.length}</Typography>

              {isLoggedIn && userDetail?.email === userData.email && (
                <Box>
                  <Button variant="contained" onClick={handleOpen}>
                    Edit Profile
                  </Button>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <EditProfilePage
                        setOpen={setOpen}
                        userDetail={userData}
                        setIsDataChanged={setIsDataChanged}
                      />
                    </Box>
                  </Modal>
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <CircularProgress />
        )}
        <Box
          sx={{
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "1fr repeat(3, 1fr)",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          {posts &&
            posts.length > 0 &&
            posts.map((item) => {
              return <HomeCard item={item} key={item._id} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserProfile;
