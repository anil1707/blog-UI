import {
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import Popover from "@mui/material/Popover";
import SearchComponent from "./SearchComponent";

const Nav = () => {
  let { setAndGetEmail, email } = useContext(Context);
  const [userName, setUserName] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSearchClicked] = useState(false);
  const navigate = useNavigate();

  const regiesterHandler = () => {
    navigate("/register");
  };
  const loginHandler = () => {
    navigate("/login");
  };
  useEffect(() => {
      fetch("https://blog-backend-i14c.onrender.com/user/profile", {
        credentials: "include",
      }).then(response=>{
        response.json().then(userInfo=>{
          setUserName(userInfo.email);
          setAndGetEmail(userInfo.email);
        })
      })
  }, [setAndGetEmail]);

  let logoutHandler = async () => {
    let response = await fetch("https://blog-backend-i14c.onrender.com/user/logout", {
      credentials: "include",
      method: "post",
    });
    response.json();
    setUserName(null);
    setAndGetEmail("");
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

  // const handleSearchClose = () => {
  //   setIsSearchClicked(false);
  // };

  const gapCalculator = () => {
    if (userName && isSearchClicked) {
      return "35vw";
    } else if (userName && !isSearchClicked) {
      return "50vw";
    } else if (!userName && isSearchClicked) {
      return "45vw";
    } else if (!userName && !isSearchClicked) {
      return "50vw";
    }
  };

  return (
    <Box
      sx={{
        width: "80vw",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        gap:
          !userName && isSearchClicked
            ? "50vw"
            : !isSearchClicked && userName
            ? "50vw"
            : "32vw",
        
        alignItems: "center",
        marginBottom: "5vh",
        marginTop: "2vh",
        position: "sticky",
        top: "0",
        zIndex: "10",
        background: "white",
        boxShadow: "1px 1px 20px #cccccc",
        padding: "15px",
      }}
      style={{gap: gapCalculator(),}}
    >
      <Typography
        variant={"h5"}
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        My Blog
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {email && (
          <>
            {/* <SearchComponent /> */}
            <Typography variant="h6">Category</Typography>
            <Typography
              sx={{ cursor: "pointer" }}
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
              <Avatar>{userName && userName.split("@")[0][0]}</Avatar>
              {userName && userName.split("@")[0]}
            </Typography>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "-100px",
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

        {!email && (
          <>
            <SearchComponent />
            <Typography variant="h6">Category</Typography>

            <Typography
              sx={{ cursor: "pointer" }}
              variant="h6"
              onClick={regiesterHandler}
            >
              Register
            </Typography>
            <Typography
              variant="h6"
              sx={{ cursor: "pointer" }}
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
