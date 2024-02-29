import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Typography } from "@mui/material";

const ShareButtons = (props) => {
  const [isCopied, setIsCopied] = useState(false);

  setTimeout(() => {
    setIsCopied(false);
  }, 5000);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(props.shareUrl)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => console.error("Error copying to clipboard:", err));
  };
  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          gap: "10px",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px gray",
          zIndex: "10",
          background: "white",
          right: "0",
        }}
      >
        <FacebookShareButton url={props.shareUrl} quote={props.title}>
          <FacebookIcon
            sx={{
              padding: "4px",
              ":hover": { background: "lightgray", borderRadius: "5px" },
            }}
          />
        </FacebookShareButton>
        <TwitterShareButton url={props.shareUrl} title={props.title}>
          <TwitterIcon
            sx={{
              padding: "4px",
              ":hover": { background: "lightgray", borderRadius: "5px" },
            }}
          />
        </TwitterShareButton>
        <LinkedinShareButton url={props.shareUrl} title={props.title}>
          <LinkedInIcon
            sx={{
              padding: "4px",
              ":hover": { background: "lightgray", borderRadius: "5px" },
            }}
          />
        </LinkedinShareButton>
        <ContentCopyIcon
          sx={{
            cursor: "pointer",
            padding: "4px",
            ":hover": { background: "lightgray", borderRadius: "5px" },
          }}
          onClick={copyToClipboard}
        />
      </Box>
      {isCopied && (
        <Typography sx={{ position: "absolute", bottom: "5px", right: "70px" }}>
          copied
        </Typography>
      )}
    </Box>
  );
};

export default ShareButtons;
