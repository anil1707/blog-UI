import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./alertMessage/ErrorMessage";
import validator from "validator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import API_BASE_URL from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isAllFieldFilled, setIsAllFieldFilled] = useState(false);
  const [notExist, setNotExist] = useState(false);
  const [wrongCredential, setWrongCredential] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(loginData.email)) {
      return setIsEmailValid(false);
    }

    if (loginData.email === "" || loginData.password === "") {
      return setIsAllFieldFilled(true);
    }
    setIsLoading(true);
    let response = await fetch(`${API_BASE_URL.base_url}/user/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials: "include",
    });
    let data = await response.json();

    if (data.message === "Logged in successfully!") {
      localStorage.setItem("loginStatus", true);
      navigate("/");
    } else if (data.message === "Email or Password is wrong!") {
      setWrongCredential(true);
    } else if (data.message === "User doesn't exist, please register first!") {
      setNotExist(true);
    }
    setIsLoading(false);
  };
  const registerHandler = () => {
    navigate("/register");
  };
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "password") {
      setWrongCredential(false);
    }
    if (name === "email") {
      setNotExist(false);
    }
    if (name === "email" || name === "password") {
      setIsAllFieldFilled(false);
    }
    setIsEmailValid(true);
    setLoginData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box>
      <Nav />
      <Paper
        sx={{
          width: "40vw",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          marginTop: "15vh",
          padding: "60px 20px",
          boxShadow: "2px 2px 15px gray",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Box sx={{ width: "80%" }}>
          {isAllFieldFilled ? (
            <ErrorMessage message="Please fill all the filed carefully!" />
          ) : (
            ""
          )}
          {notExist ? (
            <ErrorMessage message="User doesn't exist, please register first!" />
          ) : (
            ""
          )}
          {wrongCredential ? (
            <ErrorMessage message="Email or Password is wrong!" />
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label htmlFor="email">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleOnChange}
            size="small"
          />
          {!isEmailValid && (
            // <Typography sx={{ color: "red" }}>Email is not valid</Typography>
            <ErrorMessage message="Email is not valid" />
          )}
        </Box>

        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label htmlFor="password">
            Password<span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            id="password"
            placeholder="Password"
            type={showPassword ? "password" : ""}
            name="password"
            value={loginData.password}
            onChange={handleOnChange}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <VisibilityOffIcon
                      onClick={handleShowPassword}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={handleShowPassword}
                      cursor="pointer"
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ width: "80%", display: "flex", justifyContent: "flex-end" }}>
          <Link style={{ cursor: "pointer" }}>Forgot password?</Link>
        </Box>
        <Button
          variant="contained"
          onClick={loginHandler}
          sx={{ width: "80%" }}
        >
          {!isLoading ? (
            "Login"
          ) : (
            <CircularProgress style={{ color: "white", width:"25px", height:"25px" }} />
          )}
        </Button>

        <Box sx={{ display: "flex" }}>
          <Typography mr={"10px"}>Haven't an account</Typography>
          <Link sx={{ cursor: "pointer" }} onClick={registerHandler}>
            Register here
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
