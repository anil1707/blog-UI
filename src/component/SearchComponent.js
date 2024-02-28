import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchComponent = ({ findSearchText }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    findSearchText(e.target.value);
  };
  const handleClearText = () => {
    setSearchText("");
    findSearchText("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 600,
            marginBottom: "60px",
            border: "1px solid black",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search blogs"
            inputProps={{ "aria-label": "search blogs" }}
            onChange={handleSearchText}
            value={searchText}
          />
          {searchText && (
            <IconButton type="button" sx={{ p: "10px" }} aria-label="clear">
              <ClearIcon onClick={handleClearText} />
            </IconButton>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchComponent;
