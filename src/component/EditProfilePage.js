import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import API_BASE_URL from "../config";

const EditProfilePage = ({ setOpen, userDetail,setIsDataChanged }) => {
  const [userObj, setUserObj] = useState({
    userName: userDetail.userName,
    firstName: userDetail.firstName,
    lastName: userDetail.lastName,
  });

  

  const handleInput = (e) => {
    let { name, value } = e.target;
    setUserObj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = async () => {
    fetch(`${API_BASE_URL.base_url}/user/editProfile`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userObj.userName,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userDetail.email,
      }),   
      credentials: "include",
    }).then((response) => {
      response.json().then((result) => {
        if(result){
          setIsDataChanged(result)
            setOpen(false)
        }
      });
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>User Name</label>
          <TextField
            size="small"
            value={userObj.userName}
            name="userName"
            onChange={handleInput}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>First Name</label>
          <TextField
            size="small"
            value={userObj.firstName}
            name="firstName"
            onChange={handleInput}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>Last Name</label>
          <TextField
            size="small"
            value={userObj.lastName}
            name="lastName"
            onChange={handleInput}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "50px" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleEditProfile}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
