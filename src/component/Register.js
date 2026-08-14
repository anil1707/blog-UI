import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "./alertMessage/ErrorMessage";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import validator from "validator";
import API_BASE_URL from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
  });

  const [isAlreadRegisered, setisAlreadRegisered] =
    useState(false);

  const [isPasswordMatched, setIsPasswordMatched] =
    useState(false);

  const [, setApiRespnse] = useState({});

  const [showPassword, setShowPassword] =
    useState(true);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(true);

  const [isAllFieldFilled, setIsAllFieldFilled] =
    useState(false);

  const [isValidEmail, setIsValidEmail] =
    useState(true);

  const [isLoading, setIsLoading] =
    useState(false);

  // ============================================
  // Register
  // ============================================

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

    if (
      inputData.email &&
      !validator.isEmail(inputData.email)
    ) {
      setIsLoading(false);
      return setIsValidEmail(false);
    }

    if (
      inputData.password !==
      inputData.confirmPassword
    ) {
      setIsLoading(false);
      return setIsPasswordMatched(true);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL.base_url}/user/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(inputData),
        }
      );

      const result = await response.json();

      setApiRespnse(result);

      if (
        result.message ===
        "successfully registered"
      ) {
        navigate("/login");
      } else if (
        result.message === "Already registered!"
      ) {
        setisAlreadRegisered(true);
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Input Change
  // ============================================

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setIsAllFieldFilled(false);

    if (name === "email") {
      setIsValidEmail(true);
      setisAlreadRegisered(false);
    }

    if (
      name === "password" ||
      name === "confirmPassword"
    ) {
      setIsPasswordMatched(false);
    }

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // Password Visibility
  // ============================================

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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
          REGISTER CARD
      =========================================== */}

      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          registerHandler();
        }}
        elevation={0}
        sx={{
          width: {
            xs: "calc(100% - 32px)",
            sm: "450px",
            md: "520px",
          },

          maxWidth: "520px",

          margin: {
            xs: "25px auto 30px",
            sm: "40px auto 40px",
            md: "55px auto 50px",
          },

          padding: {
            xs: "28px 20px",
            sm: "38px 32px",
            md: "42px 40px",
          },

          boxSizing: "border-box",

          display: "flex",
          flexDirection: "column",

          alignItems: "center",

          gap: {
            xs: "17px",
            sm: "19px",
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
              xs: "26px",
              sm: "30px",
              md: "32px",
            },

            color: "#222",

            textAlign: "center",
          }}
        >
          Create Account
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
              message="Please fill all the required fields carefully!"
            />
          )}

          {isAlreadRegisered && (
            <ErrorMessage
              message="Already Registered, Please login!"
            />
          )}

          {isPasswordMatched && (
            <ErrorMessage
              message="Password and confirm password do not match"
            />
          )}
        </Box>

        {/* ========================================
            USERNAME
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
            htmlFor="username"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            User Name
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
            id="username"
            name="userName"
            placeholder="Enter user name"
            value={inputData.userName}
            onChange={handleOnChange}
            size="small"
            autoComplete="username"
          />
        </Box>

        {/* ========================================
            FIRST NAME + LAST NAME
        ========================================= */}

        <Box
          sx={{
            width: "100%",

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },

            gap: {
              xs: "17px",
              sm: "14px",
            },
          }}
        >
          {/* First Name */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <Typography
              component="label"
              htmlFor="firstname"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              First Name
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
              id="firstname"
              name="firstName"
              placeholder="First Name"
              value={inputData.firstName}
              onChange={handleOnChange}
              size="small"
              autoComplete="given-name"
            />
          </Box>

          {/* Last Name */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <Typography
              component="label"
              htmlFor="lastname"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Last Name
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
              id="lastname"
              name="lastName"
              placeholder="Last Name"
              value={inputData.lastName}
              onChange={handleOnChange}
              size="small"
              autoComplete="family-name"
            />
          </Box>
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
            name="email"
            type="email"
            value={inputData.email}
            onChange={handleOnChange}
            size="small"
            autoComplete="email"
          />

          {!isValidEmail && (
            <Typography
              sx={{
                color: "red",
                fontSize: "13px",
              }}
            >
              Invalid Email
            </Typography>
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
            name="password"
            placeholder="Enter password"
            type={
              showPassword
                ? "password"
                : "text"
            }
            size="small"
            value={inputData.password}
            onChange={handleOnChange}
            autoComplete="new-password"
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
            CONFIRM PASSWORD
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
            htmlFor="confirm_password"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Confirm Password
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
            id="confirm_password"
            name="confirmPassword"
            placeholder="Confirm password"
            type={
              showConfirmPassword
                ? "password"
                : "text"
            }
            size="small"
            value={inputData.confirmPassword}
            onChange={handleOnChange}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={
                      handleShowConfirmPassword
                    }
                    edge="end"
                    aria-label={
                      showConfirmPassword
                        ? "Show password"
                        : "Hide password"
                    }
                  >
                    {showConfirmPassword ? (
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
            REGISTER BUTTON
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
                width:
                  "24px !important",
                height:
                  "24px !important",
              }}
            />
          ) : (
            "Register"
          )}
        </Button>

        {/* ========================================
            LOGIN LINK
        ========================================= */}

        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",

            flexWrap: "wrap",

            gap: "5px",

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
            Have already an account?
          </Typography>

          <Link
            component="button"
            type="button"
            onClick={() =>
              navigate("/login")
            }
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
            Login here
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;