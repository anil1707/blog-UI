import {
  Autocomplete,
  Avatar,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import logo from '../images/bloglogo.png'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import Popover from "@mui/material/Popover";
import SearchIcon from "@mui/icons-material/Search";

const Nav = () => {
  let {
    userDetail,
    getUserDetail,
    isSearchOpen,
    setSearchOpenClose,
    sendSearchText,
    sendFilterText,
    category
  } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  const getUserProfileData = async () => {
    const response = await fetch("http://localhost:5000/user/profile", {
      credentials: "include",
    });

    const userInfo = await response.json();
    getUserDetail(userInfo.userData);
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  let logoutHandler = async () => {
    let response = await fetch("http://localhost:5000/user/logout", {
      credentials: "include",
      method: "post",
    });
    response.json();
    getUserDetail("");
    localStorage.setItem("loginStatus", false);
    navigate("/");
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const manageSearch = () => {
    if (!isSearchOpen) {
      setSearchOpenClose(true);
    } else {
      setSearchOpenClose(false);
      sendSearchText("");
    }
  };

  const handleCategoryOnChange = (e, value) => {
    sendFilterText(value);
  };

  function onClickProfile() {
    navigate(`/user-profile/${userDetail.email}`);
    handleClose();
  }
  return (
    <Box
      sx={{
        width: "97.5vw",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5vh",
        marginTop: "2vh",
        position: "sticky",
        top: "0",
        zIndex: "10",
        background: "white",
        boxShadow: "1px 1px 20px #cccccc",
        padding: "15px",
        gap: "50vw",
      }}
    >
      <img src={logo}
        style={{ cursor: "pointer", ":hover": { color: "#3333cc" }, width:"100px" }}
        onClick={() => navigate("/")}
        alt="logo"
      />
        
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {userDetail?.email && (
          <>
            <SearchIcon
              onClick={manageSearch}
              sx={{
                fontSize: "40px",
                color: "gray",
                cursor: "pointer",
                ":hover": { color: "#3333cc" },
              }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={category}
              variant="small"
              sx={{ width: 250 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              onChange={handleCategoryOnChange}
            />
            <Typography
              sx={{ cursor: "pointer", ":hover": { color: "#3333cc" } }}
              variant="h6"
              onClick={() => navigate("/create")}
            >
              Create Post
            </Typography>
            <Typography
              variant="h6"
              onClick={handleClick}
              sx={{
                cursor: "pointer",
                textTransform: "capitalize",
                display: "flex",
                gap: "15px",
                border: "1px solid gray",
                padding: "5px 20px",
                borderRadius: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar>
                {userDetail &&
                  userDetail?.email &&
                  userDetail?.email.split("@")[0][0]}
              </Avatar>
              {userDetail?.firstName && userDetail?.firstName}
            </Typography>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: -1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "3px 10px",
                    ":hover": { background: "#cecece" },
                    marginBottom: "10px",
                  }}
                  onClick={() => onClickProfile()}
                >
                  Profile
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    ":hover": { background: "#cecece" },
                    padding: "3px 10px",
                  }}
                  onClick={logoutHandler}
                >
                  Logout
                </Typography>
              </Box>
            </Popover>
          </>
        )}

        {!userDetail?.email && (
          <>
            <SearchIcon
              onClick={manageSearch}
              sx={{
                fontSize: "40px",
                color: "gray",
                cursor: "pointer",
                ":hover": { color: "#3333cc" },
              }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={category}
              variant="small"
              sx={{ width: 250 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              onChange={handleCategoryOnChange}
            />

            <Typography
              sx={{ cursor: "pointer", ":hover": { color: "#3333cc" } }}
              variant="h6"
              onClick={loginHandler}
            >
              Create Post
            </Typography>
            <Typography
              variant="h6"
              sx={{ cursor: "pointer", ":hover": { color: "#3333cc" } }}
              onClick={loginHandler}
            >
              Login
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
