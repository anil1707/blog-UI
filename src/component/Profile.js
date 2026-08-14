import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import Nav from "./Nav";
import { Context } from "../App";
import API_BASE_URL from "../config";

const Profile = () => {
  const { userDetail } = useContext(Context);

  const [isEditClicked, setIsEditClicked] =
    useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pic, setPic] = useState("");

  // Initialize fields from user details
  useEffect(() => {
    if (userDetail) {
      setUserName(userDetail?.userName || "");
      setFristName(userDetail?.firstName || "");
      setLastName(userDetail?.lastName || "");
    }
  }, [userDetail]);

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

    setUserName(userDetail?.userName || "");
    setFristName(userDetail?.firstName || "");
    setLastName(userDetail?.lastName || "");
  };

  const handleEdit = async () => {
    try {
      const data = new FormData();

      if (pic?.[0]) {
        data.set("pic", pic[0]);
      }

      data.set("firstName", firstName);
      data.set("lastName", lastName);
      data.set("userName", userName);

      const response = await fetch(
        `${API_BASE_URL.base_url}/user/editProfile`,
        {
          method: "PUT",
          body: data,
          headers: {
            authorization:
              "Bearer " +
              localStorage.getItem("token"),
          },
        }
      );

      await response.json();

      setIsEditClicked(false);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );
    }
  };

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
          PROFILE CONTAINER
      =========================================== */}

      <Box
        sx={{
          width: "100%",

          display: "flex",
          justifyContent: "center",

          padding: {
            xs: "20px 16px 40px",
            sm: "30px 24px 50px",
            md: "40px 30px 60px",
          },

          boxSizing: "border-box",
        }}
      >
        {/* ========================================
            PROFILE CARD
        ========================================= */}

        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "90%",
              md: "70%",
              lg: "600px",
            },

            maxWidth: "600px",

            border:
              "1px solid #e8e8e8",

            borderRadius: {
              xs: "10px",
              sm: "12px",
            },

            backgroundColor: "#fff",

            boxShadow:
              "0 8px 30px rgba(0, 0, 0, 0.07)",

            overflow: "hidden",
          }}
        >
          {/* ======================================
              PROFILE HEADER
          ======================================= */}

          <Box
            sx={{
              width: "100%",

              display: "flex",
              flexDirection: "column",

              alignItems: "center",

              padding: {
                xs: "30px 20px 20px",
                sm: "40px 20px 25px",
              },

              boxSizing: "border-box",

              borderBottom:
                "1px solid #eeeeee",

              background:
                "linear-gradient(180deg, #f8f8ff 0%, #ffffff 100%)",
            }}
          >
            {/* Profile Image */}

            <Box
              sx={{
                width: {
                  xs: "90px",
                  sm: "105px",
                },

                height: {
                  xs: "90px",
                  sm: "105px",
                },

                borderRadius: "50%",

                overflow: "hidden",

                border:
                  "4px solid #fff",

                boxShadow:
                  "0 4px 15px rgba(0, 0, 0, 0.15)",

                position: "relative",

                backgroundColor: "#f1f1f1",
              }}
            >
              {userDetail?.logo ? (
                <Box
                  component="img"
                  src={userDetail.logo}
                  alt="Profile"
                  sx={{
                    width: "100%",
                    height: "100%",

                    objectFit: "cover",

                    display: "block",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    color: "#888",

                    fontSize: "32px",
                    fontWeight: 600,
                  }}
                >
                  {userDetail?.firstName
                    ?.charAt(0)
                    ?.toUpperCase()}
                </Box>
              )}
            </Box>

            {/* Camera */}

            {isEditClicked && (
              <Box
                component="label"
                htmlFor="image"
                sx={{
                  width: {
                    xs: "34px",
                    sm: "38px",
                  },

                  height: {
                    xs: "34px",
                    sm: "38px",
                  },

                  marginTop: "-28px",

                  marginLeft: {
                    xs: "65px",
                    sm: "75px",
                  },

                  zIndex: 2,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  borderRadius: "50%",

                  backgroundColor:
                    "#3333cc",

                  color: "#fff",

                  cursor: "pointer",

                  boxShadow:
                    "0 3px 10px rgba(0, 0, 0, 0.2)",

                  transition:
                    "background-color 0.2s ease",

                  "&:hover": {
                    backgroundColor:
                      "#2929a8",
                  },
                }}
              >
                <PhotoCameraOutlinedIcon
                  sx={{
                    fontSize: {
                      xs: "19px",
                      sm: "21px",
                    },
                  }}
                />

                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={handlePic}
                  style={{
                    display: "none",
                  }}
                />
              </Box>
            )}

            {/* Email */}

            <Typography
              sx={{
                marginTop: "18px",

                fontSize: {
                  xs: "13px",
                  sm: "14px",
                },

                color: "#666",

                textAlign: "center",

                wordBreak: "break-word",
              }}
            >
              {userDetail?.email}
            </Typography>
          </Box>

          {/* ======================================
              PROFILE FORM
          ======================================= */}

          <Box
            sx={{
              width: "100%",

              padding: {
                xs: "22px 18px",
                sm: "28px 35px",
                md: "32px 45px",
              },

              boxSizing: "border-box",
            }}
          >
            {/* Username */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",

                marginBottom: "18px",
              }}
            >
              <Typography
                component="label"
                htmlFor="username"
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                User Name
              </Typography>

              <TextField
                fullWidth
                placeholder="User name"
                id="username"
                value={
                  isEditClicked
                    ? userName
                    : userDetail?.userName || ""
                }
                size="small"
                onChange={handleUserName}
                disabled={!isEditClicked}
              />
            </Box>

            {/* First Name */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",

                marginBottom: "18px",
              }}
            >
              <Typography
                component="label"
                htmlFor="first_name"
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                First Name
              </Typography>

              <TextField
                fullWidth
                placeholder="First name"
                id="first_name"
                value={
                  isEditClicked
                    ? firstName
                    : userDetail?.firstName || ""
                }
                disabled={!isEditClicked}
                size="small"
                onChange={handleFirstName}
              />
            </Box>

            {/* Last Name */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "7px",

                marginBottom: "25px",
              }}
            >
              <Typography
                component="label"
                htmlFor="last_name"
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                Last Name
              </Typography>

              <TextField
                fullWidth
                placeholder="Last name"
                id="last_name"
                value={
                  isEditClicked
                    ? lastName
                    : userDetail?.lastName || ""
                }
                disabled={!isEditClicked}
                size="small"
                onChange={handleLastName}
              />
            </Box>

            {/* ==================================
                BUTTONS
            =================================== */}

            {!isEditClicked ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    setIsEditClicked(true)
                  }
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "120px",
                    },

                    height: "42px",

                    textTransform: "none",

                    borderRadius: "7px",

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
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",

                  justifyContent: {
                    xs: "stretch",
                    sm: "flex-end",
                  },

                  gap: "12px",

                  flexDirection: {
                    xs: "column-reverse",
                    sm: "row",
                  },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "120px",
                    },

                    height: "42px",

                    textTransform: "none",

                    borderRadius: "7px",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleEdit}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "120px",
                    },

                    height: "42px",

                    textTransform: "none",

                    borderRadius: "7px",

                    backgroundColor:
                      "#3333cc",

                    "&:hover": {
                      backgroundColor:
                        "#2929a8",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;