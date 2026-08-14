import {
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";

import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "./alertMessage/ErrorMessage";

import validator from "validator";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import API_BASE_URL from "../config";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isAllFieldFilled, setIsAllFieldFilled] =
    useState(false);

  const [notExist, setNotExist] =
    useState(false);

  const [wrongCredential, setWrongCredential] =
    useState(false);

  const [isEmailValid, setIsEmailValid] =
    useState(true);

  const [showPassword, setShowPassword] =
    useState(true);

  const [isLoading, setIsLoading] =
    useState(false);

  // ============================================
  // Login
  // ============================================

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(loginData.email)) {
      setIsEmailValid(false);
      return;
    }

    if (
      loginData.email === "" ||
      loginData.password === ""
    ) {
      setIsAllFieldFilled(true);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_BASE_URL.base_url}/user/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (
        data.message ===
        "Logged in successfully!"
      ) {
        localStorage.setItem(
          "loginStatus",
          "true"
        );

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/");
      } else if (
        data.message ===
        "Email or Password is wrong!"
      ) {
        setWrongCredential(true);
      } else if (
        data.message ===
        "User doesn't exist, please register first!"
      ) {
        setNotExist(true);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Register
  // ============================================

  const registerHandler = () => {
    navigate("/register");
  };

  // ============================================
  // Input Change
  // ============================================

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setWrongCredential(false);
    }

    if (name === "email") {
      setNotExist(false);
    }

    if (
      name === "email" ||
      name === "password"
    ) {
      setIsAllFieldFilled(false);
    }

    setIsEmailValid(true);

    setLoginData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // ============================================
  // Show / Hide Password
  // ============================================

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
          LOGIN CARD
      =========================================== */}

      <Paper
        component="form"
        onSubmit={loginHandler}
        elevation={0}
        sx={{
          width: {
            xs: "calc(100% - 32px)",
            sm: "450px",
            md: "480px",
          },

          maxWidth: "480px",

          margin: {
            xs: "30px auto",
            sm: "50px auto",
            md: "70px auto",
          },

          padding: {
            xs: "30px 20px",
            sm: "40px 35px",
            md: "45px 40px",
          },

          boxSizing: "border-box",

          display: "flex",
          flexDirection: "column",

          alignItems: "center",

          gap: {
            xs: "18px",
            sm: "20px",
          },

          borderRadius: {
            xs: "10px",
            sm: "12px",
          },

          border:
            "1px solid #eeeeee",

          boxShadow:
            "0 8px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* ========================================
            TITLE
        ========================================= */}

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,

            fontSize: {
              xs: "28px",
              sm: "32px",
              md: "34px",
            },

            color: "#222",
          }}
        >
          Login
        </Typography>

        {/* ========================================
            ERROR MESSAGES
        ========================================= */}

        <Box
          sx={{
            width: "100%",
          }}
        >
          {isAllFieldFilled && (
            <ErrorMessage
              message="Please fill all the fields carefully!"
            />
          )}

          {notExist && (
            <ErrorMessage
              message="User doesn't exist, please register first!"
            />
          )}

          {wrongCredential && (
            <ErrorMessage
              message="Email or Password is wrong!"
            />
          )}
        </Box>

        {/* ========================================
            EMAIL
        ========================================= */}

        <Box
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",

            gap: "6px",
          }}
        >
          <Typography
            component="label"
            htmlFor="email"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Email
            <Box
              component="span"
              sx={{
                color: "red",
                marginLeft: "3px",
              }}
            >
              *
            </Box>
          </Typography>

          <TextField
            fullWidth
            id="email"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleOnChange}
            size="small"
            autoComplete="email"
          />

          {!isEmailValid && (
            <ErrorMessage
              message="Email is not valid"
            />
          )}
        </Box>

        {/* ========================================
            PASSWORD
        ========================================= */}

        <Box
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",

            gap: "6px",
          }}
        >
          <Typography
            component="label"
            htmlFor="password"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Password
            <Box
              component="span"
              sx={{
                color: "red",
                marginLeft: "3px",
              }}
            >
              *
            </Box>
          </Typography>

          <TextField
            fullWidth
            id="password"
            placeholder="Enter your password"
            type={
              showPassword
                ? "password"
                : "text"
            }
            name="password"
            value={loginData.password}
            onChange={handleOnChange}
            size="small"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={
                      handleShowPassword
                    }
                    edge="end"
                    aria-label={
                      showPassword
                        ? "Show password"
                        : "Hide password"
                    }
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* ========================================
            FORGOT PASSWORD
        ========================================= */}

        <Box
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "flex-end",

            marginTop: "-5px",
          }}
        >
          <Link
            component="button"
            type="button"
            underline="hover"
            sx={{
              border: 0,
              background: "none",
              padding: 0,

              cursor: "pointer",

              fontSize: "14px",
              color: "#3333cc",
            }}
          >
            Forgot password?
          </Link>
        </Box>

        {/* ========================================
            LOGIN BUTTON
        ========================================= */}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{
            height: {
              xs: "44px",
              sm: "46px",
            },

            marginTop: "5px",

            borderRadius: "7px",

            textTransform: "none",

            fontSize: "16px",
            fontWeight: 600,

            backgroundColor: "#3333cc",

            "&:hover": {
              backgroundColor: "#2929a8",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: "white",
                width: "24px !important",
                height: "24px !important",
              }}
            />
          ) : (
            "Login"
          )}
        </Button>

        {/* ========================================
            REGISTER
        ========================================= */}

        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",

            flexWrap: "wrap",

            gap: "5px",

            marginTop: "5px",

            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                sm: "15px",
              },

              color: "#555",
            }}
          >
            Haven't an account?
          </Typography>

          <Link
            component="button"
            type="button"
            onClick={registerHandler}
            underline="hover"
            sx={{
              border: 0,
              background: "none",
              padding: 0,

              cursor: "pointer",

              fontSize: {
                xs: "14px",
                sm: "15px",
              },

              fontWeight: 600,

              color: "#3333cc",
            }}
          >
            Register here
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;