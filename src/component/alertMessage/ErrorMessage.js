import { Box, Typography } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorMessage = (props) => {
  return (
    <Box>
      <Typography sx={{ color: "red", display: "flex", alignItems: "center" }}>
        <ErrorOutlineIcon sx={{ marginRight: ".4vw", fontSize: "1.2rem" }} />{" "}
        {props.message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
