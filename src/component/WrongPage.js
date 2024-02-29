import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const WrongPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "30vw",
          borderRadius: "8px",
          boxShadow: "2px 2px 10px gray",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          gap: "10px",
        }}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          Page Not Found
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    </div>
  );
};

export default WrongPage;
