import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../App";
import logo from "../images/bloglogo.png";
import API_BASE_URL from "../config";

const Nav = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    userDetail,
    getUserDetail,
    isSearchOpen,
    setSearchOpenClose,
    sendSearchText,
    sendFilterText,
    category,
  } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location)

  let hideSomeOption = false;
  if(location?.pathname == "/create" || location?.pathname?.includes("/user-profile")){
    hideSomeOption = true;
  }

  const theme = useTheme();

  // Tablet + mobile
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Profile menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Mobile menu
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const isProfileMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMenuAnchor);

  const loginHandler = () => {
    navigate("/login");
    handleMobileMenuClose();
  };

  const getUserProfileData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${API_BASE_URL.base_url}/user/profile`,
        {
          headers: {
            authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const userInfo = await response.json();

      if (userInfo.Error === "Please sign in") {
        localStorage.setItem("token", "");
        localStorage.setItem("loginStatus", "false");
        getUserDetail("");
        return;
      }

      getUserDetail(userInfo.userData);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getUserProfileData();

    // eslint-disable-next-line
  }, []);

  const logoutHandler = async () => {
    try {
      await fetch(`${API_BASE_URL.base_url}/user/logout`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    getUserDetail("");

    localStorage.setItem("loginStatus", "false");
    localStorage.setItem("token", "");

    handleClose();
    handleMobileMenuClose();

    navigate("/");
  };

  // --------------------------------------------------
  // Profile menu
  // --------------------------------------------------

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickProfile = () => {
    navigate(`/user-profile/${userDetail.email}`);
    handleClose();
  };

  // --------------------------------------------------
  // Mobile menu
  // --------------------------------------------------

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const manageSearch = () => {
    if (!isSearchOpen) {
      setSearchOpenClose(true);
    } else {
      setSearchOpenClose(false);
      sendSearchText("");
    }

    handleMobileMenuClose();
  };

  // --------------------------------------------------
  // Category
  // --------------------------------------------------

  const handleCategoryOnChange = (event, value) => {
    sendFilterText(value);
  };

  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  const handleCreatePost = () => {
    if (userDetail?.email) {
      navigate("/create");
    } else {
      navigate("/login");
    }

    handleMobileMenuClose();
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const isLoggedIn = Boolean(userDetail?.email);

  if(isLoading){
    return (
      null
    )
  }

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
        position: "sticky",
        top: 0,
        zIndex: 1100,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: "#fff",

        padding: {
          xs: "10px 14px",
          sm: "12px 20px",
          md: "14px 28px",
        },

        marginBottom: {
          xs: "20px",
          sm: "25px",
          md: "35px",
        },

        borderRadius: {
          xs: 0,
          sm: "0 0 12px 12px",
        },

        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",

        boxSizing: "border-box",
      }}
    >
      {/* --------------------------------------------------
          Logo
      -------------------------------------------------- */}

      <Box
        onClick={handleLogoClick}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Blog logo"
          sx={{
            width: {
              xs: "75px",
              sm: "85px",
              md: "120px",
            },

            height: "auto",

            display: "block",

            transition: "transform 0.2s ease",

            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />
      </Box>

      {/* --------------------------------------------------
          Desktop / Tablet Navigation
      -------------------------------------------------- */}

      {!isMobileOrTablet && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Search */}

         {!hideSomeOption && <IconButton
            onClick={manageSearch}
            aria-label="Search"
            sx={{
              color: "gray",

              "&:hover": {
                color: "#3333cc",
                backgroundColor: "rgba(51, 51, 204, 0.06)",
              },
            }}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>}

          {/* Category */}

          {!hideSomeOption && <Autocomplete
            disablePortal
            options={category || []}
            size="small"
            sx={{
              width: {
                md: 180,
                lg: 220,
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
              />
            )}
            onChange={handleCategoryOnChange}
          />}

          {/* Create Post */}

          <Typography
            variant="body1"
            onClick={handleCreatePost}
            sx={{
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: 500,

              "&:hover": {
                color: "#3333cc",
              },
            }}
          >
            Create Post
          </Typography>

          {/* Logged In */}

          {isLoggedIn ? (
            <Box
              onClick={handleProfileClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",

                padding: "6px 14px 6px 7px",

                border: "1px solid #ddd",
                borderRadius: "30px",

                cursor: "pointer",

                transition: "all 0.2s ease",

                "&:hover": {
                  borderColor: "#3333cc",
                  backgroundColor: "#f7f7ff",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  fontSize: "15px",
                }}
              >
                {userDetail?.email
                  ?.split("@")[0]
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Avatar>

              <Typography
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userDetail?.firstName || "User"}
              </Typography>
            </Box>
          ) : (
            /* Login */

            <Typography
              variant="body1"
              onClick={loginHandler}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                whiteSpace: "nowrap",

                "&:hover": {
                  color: "#3333cc",
                },
              }}
            >
              Login
            </Typography>
          )}
        </Box>
      )}

      {/* --------------------------------------------------
          Mobile / Tablet
      -------------------------------------------------- */}

      {isMobileOrTablet && (
        <IconButton
          onClick={handleMobileMenuOpen}
          aria-label="Open navigation menu"
          sx={{
            color: "#333",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",

            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* --------------------------------------------------
          Profile Popover
      -------------------------------------------------- */}

      <Menu
        anchorEl={anchorEl}
        open={isProfileMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 150,
              marginTop: "8px",
              borderRadius: "10px",
              boxShadow:
                "0 8px 25px rgba(0, 0, 0, 0.12)",
            },
          },
        }}
      >
        <MenuItem onClick={onClickProfile}>
          Profile
        </MenuItem>

        <MenuItem onClick={logoutHandler}>
          Logout
        </MenuItem>
      </Menu>

      {/* --------------------------------------------------
          Mobile / Tablet Menu
      -------------------------------------------------- */}

      <Menu
        anchorEl={mobileMenuAnchor}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: "calc(100vw - 28px)",
                sm: 300,
              },

              maxWidth: "calc(100vw - 28px)",

              marginTop: "10px",
              borderRadius: "12px",

              boxShadow:
                "0 8px 30px rgba(0, 0, 0, 0.12)",

              padding: "8px",
            },
          },
        }}
      >
        {/* Search */}

        <MenuItem
          onClick={manageSearch}
          sx={{
            gap: "12px",
            borderRadius: "8px",
          }}
        >
          <SearchIcon fontSize="small" />

          <Typography>
            {isSearchOpen ? "Close Search" : "Search"}
          </Typography>
        </MenuItem>

        {/* Category */}

        <Box
          sx={{
            padding: "10px 8px",
          }}
        >
          <Autocomplete
            disablePortal
            options={category || []}
            size="small"
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
              />
            )}
            onChange={handleCategoryOnChange}
          />
        </Box>

        {/* Create Post */}

        <MenuItem
          onClick={handleCreatePost}
          sx={{
            borderRadius: "8px",
          }}
        >
          Create Post
        </MenuItem>

        {/* Logged In */}

        {isLoggedIn ? (
          <>
            <MenuItem
              onClick={onClickProfile}
              sx={{
                gap: "10px",
                borderRadius: "8px",
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "14px",
                }}
              >
                {userDetail?.email
                  ?.split("@")[0]
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Avatar>

              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {userDetail?.firstName || "Profile"}
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={logoutHandler}
              sx={{
                borderRadius: "8px",
              }}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={loginHandler}
            sx={{
              borderRadius: "8px",
            }}
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Nav;