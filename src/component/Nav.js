import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

const Nav = () => {
  let {setAndGetEmail, email} = useContext(Context)
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const regiesterHandler = () => {
    navigate("/register");
  };
  const loginHandler = () => {
    navigate("/login");
  };
  useEffect(() => {
    calledProfile();
  }, [email]);

  let calledProfile = async () => {
    let data = await fetch("/user/profile", {
      credentials: "include",
    });

    let userInfo = await data.json();
    setUserName(userInfo.email);
    setAndGetEmail(userInfo.email)
  };

  let logoutHandler = () => {
    fetch("/user/logout", {
      credentials: "include",
      method: "post",
    });
    setUserName(null);
    setAndGetEmail("")
    navigate('/')
  };

  
  return (
    <Box
      sx={{
        width: "80vw",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5vh",
        marginTop: "2vh",
        position: "sticky",
      }}
    >
      <Typography variant={"h5"} sx={{cursor:"pointer"}} onClick={()=>navigate('/')}>My Blog</Typography>
      <Box
        sx={{
          width: userName ? "15vw" : "10vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {email && (
          <>
            <Typography sx={{ cursor: "pointer" }} variant="h6" onClick={()=> navigate('/create')}>
              Create New Post
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              variant="h6"
              onClick={logoutHandler}
            >
              Logout
            </Typography>
          </>
        )}

        {!email && (
          <>
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
