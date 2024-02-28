import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDetail = ({ UserDetail }) => {
    const navigate = useNavigate()
    const handleProfile = ()=>{
        navigate("/user-profile/"+UserDetail)

    }
  return (
    <div>
      <Box
        className={"user_detail_container"}
        onMouseEnter={(e) => e.stopPropagation()}
      >
        <Avatar> {UserDetail[0].toUpperCase()}</Avatar>
        <Typography>{UserDetail}</Typography>
        <Box>
          <Button variant="outlined" onClick={handleProfile}> Profile</Button>
        </Box>
      </Box>
    </div>
  );
};

export default UserDetail;
