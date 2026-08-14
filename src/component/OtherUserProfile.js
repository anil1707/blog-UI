import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import EditProfilePage from "./EditProfilePage";
import { Context } from "../App";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import HomeCard from "./HomeCard";
import API_BASE_URL from "../config";

const OtherUserProfile = () => {
  const {
    userDetail,
    getUserDetail,
  } = useContext(Context);

  const { email } = useParams();

  const [posts, setPosts] = useState([]);
  const [userData, setUserDetail] = useState({});

  const isLoggedIn =
    localStorage.getItem("loginStatus");

  const [photoLoader, setPhotoLoader] =
    useState(false);

  const [pic, setPic] = useState("");

  const [isDataChanged, setIsDataChanged] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [isLoadingUser, setIsLoadingUser] =
    useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ============================================
  // Get User + Posts
  // ============================================

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoadingUser(true);

        const [postsResponse, userResponse] =
          await Promise.all([
            fetch(
              `${API_BASE_URL.base_url}/post/getPost/${email}`
            ),

            fetch(
              `${API_BASE_URL.base_url}/user/otherUserProfile/${email}`
            ),
          ]);

        const postsResult =
          await postsResponse.json();

        const userResult =
          await userResponse.json();

        setPosts(
          postsResult?.posts || []
        );

        const currentUser =
          userResult?.data || {};

        setUserDetail(currentUser);

        // Update global context when viewing
        // your own profile.
        if (
          userDetail?.email === email
        ) {
          getUserDetail(currentUser);
        }
      } catch (error) {
        console.error(
          "Failed to load user profile:",
          error
        );
      } finally {
        setIsLoadingUser(false);
      }
    };

    getUserData();

    // eslint-disable-next-line
  }, [isDataChanged, email]);

  // ============================================
  // Profile Photo
  // ============================================

  const handleProfilePhoto = async (e) => {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      setPhotoLoader(true);

      // Upload image
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

      const result =
        await response.json();

      // Update UI immediately
      setPic(result.url);

      // Update profile picture
      const picResponse = await fetch(
        `${API_BASE_URL.base_url}/user/editProfilePic/${email}`,
        {
          method: "PUT",

          body: JSON.stringify({
            pic: result.url,
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

      await picResponse.json();

      // Refresh profile data
      setIsDataChanged(
        (prev) => !prev
      );
    } catch (error) {
      console.error(
        "Failed to update profile picture:",
        error
      );
    } finally {
      setPhotoLoader(false);
    }
  };

  const profileImage =
    pic ||
    userData?.pic ||
    userData?.logo;

  const isOwnProfile =
    userDetail?.email === email;

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
            xs: "calc(100% - 24px)",
            sm: "90%",
            md: "90%",
            lg: "1200px",
          },

          maxWidth: "1200px",

          margin: {
            xs: "20px auto 40px",
            sm: "30px auto 50px",
            md: "40px auto 60px",
          },
        }}
      >
        {/* ========================================
            PROFILE SECTION
        ========================================= */}

        {!isLoadingUser ? (
          <Box
            sx={{
              width: "100%",

              display: "flex",

              alignItems: "center",

              justifyContent: {md: "left", xs: "center"},

              gap: {
                xs: "20px",
                sm: "35px",
                md: "50px",
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              padding: {
                xs: "25px 15px",
                sm: "30px",
                md: "40px",
              },

              boxSizing: "border-box",

              backgroundColor: "#fff",

              border:
                "1px solid #eeeeee",

              borderRadius: {
                xs: "10px",
                sm: "12px",
              },

              boxShadow:
                "0 6px 25px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* ====================================
                PROFILE IMAGE
            ===================================== */}

            <Box
              sx={{
                position: "relative",

                width: {
                  xs: "120px",
                  sm: "150px",
                  md: "180px",
                },

                height: {
                  xs: "120px",
                  sm: "150px",
                  md: "180px",
                },

                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={profileImage}
                alt="profile pic"
                sx={{
                  width: "100%",
                  height: "100%",

                  borderRadius: "50%",

                  objectFit: "cover",

                  display: "block",

                  backgroundColor:
                    "#eeeeee",

                  border:
                    "4px solid white",

                  boxShadow:
                    "0 4px 18px rgba(0, 0, 0, 0.15)",
                }}
              />

              {/* Camera */}

              {isOwnProfile && (
                <Box
                  component="label"
                  htmlFor="profile-image"
                  sx={{
                    position:
                      "absolute",

                    right: {
                      xs: "0px",
                      sm: "5px",
                    },

                    bottom: {
                      xs: "0px",
                      sm: "5px",
                    },

                    width: {
                      xs: "36px",
                      sm: "40px",
                    },

                    height: {
                      xs: "36px",
                      sm: "40px",
                    },

                    borderRadius: "50%",

                    display: "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    cursor: "pointer",

                    backgroundColor:
                      "#3333cc",

                    color: "#fff",

                    border:
                      "3px solid white",

                    boxShadow:
                      "0 3px 10px rgba(0, 0, 0, 0.2)",

                    zIndex: 2,

                    "&:hover": {
                      backgroundColor:
                        "#2929a8",
                    },
                  }}
                >
                  {!photoLoader ? (
                    <PhotoCameraOutlinedIcon
                      sx={{
                        fontSize: {
                          xs: "20px",
                          sm: "22px",
                        },
                      }}
                    />
                  ) : (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                        width:
                          "20px !important",
                        height:
                          "20px !important",
                      }}
                    />
                  )}

                  <TextField
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={
                      handleProfilePhoto
                    }
                    sx={{
                      display: "none",
                    }}
                  />
                </Box>
              )}
            </Box>

            {/* ====================================
                USER INFORMATION
            ===================================== */}

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",

                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                },

                gap: "10px",

                minWidth: 0,

                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              {/* Name */}

              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: {
                    xs: "center",
                    sm: "flex-start",
                  },

                  flexWrap: "wrap",

                  gap: "6px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "22px",
                      sm: "26px",
                      md: "30px",
                    },

                    fontWeight: 700,

                    color: "#222",

                    wordBreak:
                      "break-word",
                  }}
                >
                  {userData?.firstName}{" "}
                  {userData?.lastName}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "15px",
                    },

                    fontWeight: 600,

                    color: "#777",

                    wordBreak:
                      "break-word",
                  }}
                >
                  (@
                  {userData?.userName})
                </Typography>
              </Box>

              {/* Email */}

              <Typography
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "14px",
                  },

                  color: "#666",

                  wordBreak:
                    "break-word",
                }}
              >
                {userData?.email}
              </Typography>

              {/* Posts */}

              <Typography
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                  },

                  fontWeight: 600,

                  color: "#555",
                }}
              >
                {posts?.length || 0}{" "}
                {posts?.length === 1
                  ? "Post"
                  : "Posts"}
              </Typography>

              {/* Edit Profile */}

              {isLoggedIn &&
                isOwnProfile && (
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                      marginTop: "5px",

                      textTransform:
                        "none",

                      borderRadius: "7px",

                      backgroundColor:
                        "#3333cc",

                      "&:hover": {
                        backgroundColor:
                          "#2929a8",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: "250px",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* ========================================
            EDIT PROFILE MODAL
        ========================================= */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-profile-modal"
          aria-describedby="edit-profile-description"
        >
          <Box
            sx={{
              position: "absolute",

              top: "50%",
              left: "50%",

              transform:
                "translate(-50%, -50%)",

              width: {
                xs: "calc(100% - 24px)",
                sm: "500px",
                md: "550px",
              },

              maxWidth: "550px",

              maxHeight: {
                xs: "90vh",
                sm: "85vh",
              },

              overflowY: "auto",

              bgcolor:
                "background.paper",

              borderRadius: {
                xs: "10px",
                sm: "12px",
              },

              boxShadow: 24,

              padding: {
                xs: "20px 15px",
                sm: "30px",
              },

              boxSizing: "border-box",
            }}
          >
            <EditProfilePage
              setOpen={setOpen}
              userDetail={userData}
              setIsDataChanged={
                setIsDataChanged
              }
            />
          </Box>
        </Modal>

        {/* ========================================
            POSTS SECTION
        ========================================= */}

        <Box
          sx={{
            marginTop: {
              xs: "30px",
              sm: "40px",
              md: "50px",
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
              fontSize: {
                xs: "21px",
                sm: "25px",
                md: "28px",
              },

              fontWeight: 700,

              color: "#333",

              marginBottom: {
                xs: "18px",
                sm: "25px",
              },
            }}
          >
            {isOwnProfile
              ? "My Posts"
              : `${userData?.firstName || "User"}'s Posts`}
          </Typography>

          {/* ======================================
              POSTS GRID
          ======================================= */}

          {posts &&
          posts.length > 0 ? (
            <Box
              sx={{
                display: "grid",

                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },

                gap: {
                  xs: "20px",
                  sm: "25px",
                  md: "30px",
                },

                alignItems: "stretch",
              }}
            >
              {posts.map((item) => (
                <HomeCard
                  item={item}
                  key={item._id}
                />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                minHeight: "180px",

                display: "flex",

                justifyContent:
                  "center",

                alignItems:
                  "center",

                padding: "20px",

                border:
                  "1px dashed #d5d5d5",

                borderRadius: "10px",

                backgroundColor:
                  "#fff",
              }}
            >
              <Typography
                sx={{
                  color: "#888",

                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                  },

                  textAlign: "center",
                }}
              >
                No posts available.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserProfile;