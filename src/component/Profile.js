import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import Nav from "./Nav";
import { Context } from "../App";
import API_BASE_URL from "../config";

const Profile = () => {
  const { userDetail } = useContext(Context);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pic, setPic] = useState("");

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleFirstName = (e) => {
    setFristName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePic = (e) => {
    setPic(e.target.files);
  };

  const handleCancel = () => {
    setIsEditClicked(false);
    setUserName(userDetail?.userName);
    setFristName(userDetail?.firstName);
    setLastName(userDetail?.lastName);
  };

  const handleEdit = async () => {
    const data = new FormData();
    data.set("pic", pic[0]);
    data.set("firstName", firstName);
    data.set("lastName", lastName);
    data.set("userName", userName);

    const response = await fetch(`${API_BASE_URL.base_url}/user/editProfile`, {
      method: "put",
      body: data,
      headers: {
        "Content-Type": "application/json",
        authorzation: "Bearer " + localStorage.getItem("token"),
      },
    });

    await response.json();
  };

  return (
    <Box>
      <Nav />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
          flexDirection: "column",
          gap: "20px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "50%",
            border: "2px solid #f0f0f0",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "70px",
              gap: "20px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            >
              <img
                src={userDetail?.logo}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  transform: "scale(1.7)",
                }}
              />
            </Box>

            <label>
              <PhotoCameraOutlinedIcon
                sx={{
                  position: "absolute",
                  top: "54%",
                  right: "44%",
                  cursor: "pointer",
                }}
              />
              <input
                type="file"
                style={{ border: "none", display: "none" }}
                id="image"
                onChange={handlePic}
              />
            </label>

            <Typography sx={{ marginBottom: "20px", zIndex: "2" }}>
              {userDetail?.email}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px 0",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                    width: "100%",
                  }}
                >
                  <label for="username">User Name</label>
                  <TextField
                    placeholder="User name"
                    fullWidth
                    id="username"
                    value={isEditClicked ? userName : userDetail?.userName}
                    size="small"
                    onChange={handleUserName}
                    disabled={!isEditClicked ? true : false}
                  />
                </Box>
              </Box>

              {/* fist name box */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                  width: "100%",
                }}
              >
                <label for="fist_name">First Name</label>
                <TextField
                  placeholder="First name"
                  sx={{ width: "100%" }}
                  id="fist_name"
                  readonly={isEditClicked ? false : true}
                  value={isEditClicked ? firstName : userDetail?.firstName}
                  disabled={!isEditClicked ? true : false}
                  size="small"
                  onChange={handleFirstName}
                />
              </Box>
              {/* last name box */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                  width: "100%",
                }}
              >
                <label for="last_name">Last Name</label>
                <TextField
                  placeholder="Last name"
                  sx={{ width: "100%" }}
                  id="last_name"
                  value={isEditClicked ? lastName : userDetail?.lastName}
                  disabled={!isEditClicked ? true : false}
                  size="small"
                  onChange={handleLastName}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {!isEditClicked && (
                  <Button
                    variant="contained"
                    sx={{ width: "20%" }}
                    onClick={() => setIsEditClicked(true)}
                  >
                    Edit
                  </Button>
                )}

                {isEditClicked && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "7%",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ width: "20%" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: "20%" }}
                      onClick={handleEdit}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
