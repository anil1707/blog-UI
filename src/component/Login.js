import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./alertMessage/ErrorMessage";
import { Context } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAllFieldFilled, setIsAllFieldFilled] = useState(false)
  const [notExist, setNotExist] = useState(false)
  const [wrongCredential, setWrongCredential] = useState(false)
  let {setAndGetEmail} = useContext(Context)

  const loginHandler = async (e) => {
    e.preventDefault();

    let response = await fetch("/user/login", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
      credentials:"include"
    })
    let data = await response.json();

      console.log("apiREsult", data);

    if (data.message === "Logged in successfully!") {
      setAndGetEmail(email)
      navigate("/");
      setIsAllFieldFilled(false)
    } else if (data.message === "Please fill all the filed carefully!") {
      setIsAllFieldFilled(true)
    } else if(data.message === "User doesn't exist, please register first!"){
      setNotExist(true)
      setIsAllFieldFilled(false)
    } else if(data.message === 'Email or Password is wrong!'){
      setWrongCredential(true)
      setIsAllFieldFilled(false)
      setNotExist(false)
    }
  };
  const registerHandler = () => {
    navigate("/register");
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    setIsAllFieldFilled(false)
    setNotExist(false)
    setWrongCredential(false)
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsAllFieldFilled(false)
    setNotExist(false)
    setWrongCredential(false)
  };
  return (
    <Box>
      <Nav />
      <Box
        sx={{
          width: "30vw",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "30vh",
          justifyContent: "space-between",
          marginTop: "15vh",
        }}
      >
        <Typography variant="h3">Login</Typography>
        <TextField
          placeholder="Email"
          name="email"
          value={email}
          onChange={emailHandler}
          size="small"
        />
        <TextField
          placeholder="Password"
          name="password"
          value={password}
          onChange={passwordHandler}
          size="small"
        />
        <Button variant="contained" onClick={loginHandler}>
          Login
        </Button>
        {isAllFieldFilled ? <ErrorMessage message="Please fill all the filed carefully!" /> :""}
        {notExist ? <ErrorMessage  message="User doesn't exist, please register first!" />:""}
        {wrongCredential? <ErrorMessage message = "Email or Password is wrong!" /> :""}
        <Box sx={{ display: "flex" }}>
          <Typography mr={"10px"}>Or</Typography>
          <Link
            sx={{ cursor: "pointer", textDecoration: "none" }}
            onClick={registerHandler}
          >
            RIGESTER
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
