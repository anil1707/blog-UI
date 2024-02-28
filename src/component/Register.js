import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./alertMessage/ErrorMessage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import validator from "validator";

const Register = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
  });
  const [isAlreadRegisered, setisAlreadRegisered] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [, setApiRespnse] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isAllFieldFilled, setIsAllFieldFilled] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const registerHandler = async () => {
    setIsLoading(true);
    if (
      !inputData.email ||
      !inputData.userName ||
      !inputData.firstName ||
      !inputData.lastName ||
      !inputData.password ||
      !inputData.confirmPassword
    ) {
      setIsLoading(false);
      return setIsAllFieldFilled(true);
    }

    if (inputData.email && !validator.isEmail(inputData.email)) {
      setIsLoading(false);
      return setIsValidEmail(false);
    }

    if (inputData.password !== inputData.confirmPassword) {
      setIsLoading(false);
      return setIsPasswordMatched(true);
    }
    let data = await fetch("http://localhost:5000/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    let result = await data.json();
    setApiRespnse(result);
    if (result.message === "successfully registered") navigate("/login");
    else if (result.message === "Already registered!")
      setisAlreadRegisered(true);
    setIsLoading(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "email" ||
      name === "userName" ||
      name === "firstName" ||
      name === "lastName" ||
      name === "password" ||
      name === "confirmPassword"
    ) {
      setIsAllFieldFilled(false);
    }

    if (name === "email") {
      setIsValidEmail(true);
      setisAlreadRegisered(false);
    }

    if (name === "password" || name === "confirmPassword") {
      setIsPasswordMatched(false);
    }
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          gap: "20px",
          marginTop: "5vh",
          padding: "60px 20px",
          boxShadow: "2px 2px 15px gray",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Create Account</Typography>
        <Box sx={{ width: "80%" }}>
          {isAllFieldFilled ? (
            <ErrorMessage message="Please fill all the required field carefully!" />
          ) : (
            ""
          )}
          {isAlreadRegisered ? (
            <ErrorMessage message="Already Registered, Please login!" />
          ) : (
            ""
          )}
          {isPasswordMatched ? (
            <ErrorMessage message="Password and confirm password not matched" />
          ) : (
            ""
          )}
        </Box>

        {/* user name box */}
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="username">
            User Name<span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            id="username"
            name="userName"
            placeholder="User name"
            value={inputData.userName}
            onChange={handleOnChange}
            size="small"
            sx={{ width: "100%" }}
          />
        </Box>

        {/* first name and last name container */}
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Box
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label htmlFor="firstname">
              First Name<span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="firstname"
              name="firstName"
              placeholder="First Name"
              value={inputData.firstName}
              onChange={handleOnChange}
              size="small"
              sx={{ width: "95%" }}
            />
          </Box>
          <Box
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginLeft: "5%",
            }}
          >
            <label htmlFor="lastname">
              Last Name<span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              id="lastname"
              name="lastName"
              placeholder="Last Name"
              value={inputData.lastName}
              onChange={handleOnChange}
              size="small"
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>

        {/* Email box */}

        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="email">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            id="email"
            placeholder="Email"
            name="email"
            value={inputData.email}
            onChange={handleOnChange}
            size="small"
            sx={{ width: "100%" }}
          />
          {!isValidEmail && (
            <Typography sx={{ color: "red" }}>Invalid Email</Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="password">
            Password<span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            id="password"
            name="password"
            placeholder="Password"
            type={showPassword ? "password" : ""}
            size="small"
            sx={{ width: "100%" }}
            value={inputData.password}
            onChange={handleOnChange}
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
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="confirm_password">
            Confirm Password<span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            id="confirm_password"
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "password" : ""}
            size="small"
            sx={{ width: "100%" }}
            value={inputData.confirmPassword}
            onChange={handleOnChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showConfirmPassword ? (
                    <VisibilityOffIcon
                      onClick={handleShowConfirmPassword}
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={handleShowConfirmPassword}
                      cursor="pointer"
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* </Box> */}
        <Button
          variant="contained"
          sx={{ width: "80%" }}
          onClick={registerHandler}
        >
          {!isLoading ? (
            "Register"
          ) : (
            <CircularProgress
              style={{ color: "white", width: "25px", height: "25px" }}
            />
          )}
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography mr={"2px"}>Have already an account? </Typography>
          <Link sx={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
            Login here
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
