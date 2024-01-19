import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Handle the click or any other action you want to perform
      alert("Enter key pressed!");
      // here call api for search
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {!isSearchClicked ? (
        <SearchIcon fontSize="large" onClick={() => setIsSearchClicked(true)} />
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchIcon
            fontSize="large"
            fontWeight="bolder"
            onClick={() => setIsSearchClicked(false)}
          />
          <TextField
            size="small"
            variant="outlined"
            autoFocus
            onKeyDown={handleKeyDown}
            sx={{}}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchComponent;
