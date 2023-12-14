import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./alertMessage/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAlreadRegisered, setisAlreadRegisered] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [apiRespnse, setApiRespnse] = useState({})
  const [isAllFieldFilled, setIsAllFieldFilled] = useState(false)
  const navigate = useNavigate();
  const registerHandler = async () => {
    let data = await fetch("/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    let result = await data.json();
    setApiRespnse(result)
    // console.log(result);
    if (result.message === "successfully registered") navigate("/login");
    else if (result.message === "Already registered!")
      setisAlreadRegisered(true);
    else if (result.message === "Password and confirm password not matched") {
      setIsPasswordMatched(true);
    } else if(result.message === "Please fill all the field carefully!"){
      setIsAllFieldFilled(true)
    }
  }; 
  const emailHandler = (e) => {
    setEmail(e.target.value);
    setisAlreadRegisered(false);
    setIsAllFieldFilled(false)
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsPasswordMatched(false);
    setIsAllFieldFilled(false)
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatched(false);
    setIsAllFieldFilled(false)
  };
  const loginHandler = () => {
    navigate("/login");
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
          height: "35vh",
          justifyContent: "space-between",
          marginTop: "15vh",
        }}
      >
        {isAllFieldFilled ? <ErrorMessage message="Please fill all the field carefully!" />:""}
        <Typography variant="h3">Register</Typography>
        <TextField
          placeholder="Email"
          value={email}
          onChange={emailHandler}
          size="small"
        />
        <TextField
          placeholder="Password"
          size="small"
          value={password}
          onChange={passwordHandler}
        />
        <TextField
          placeholder="Confirm Password"
          size="small"
          value={confirmPassword}
          onChange={confirmPasswordHandler}
        />
        <Button variant="contained" onClick={registerHandler}>
          Register
        </Button>
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
        <Box sx={{ display: "flex" }}>
          <Typography mr={"10px"}>Or</Typography>
          <Link
            sx={{ cursor: "pointer", textDecoration: "none" }}
            onClick={loginHandler}
          >
            LOGIN
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
