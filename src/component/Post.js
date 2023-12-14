import { Box, Link, Typography } from "@mui/material";
import {formatISO9075} from 'date-fns'
import { useNavigate } from "react-router-dom";

const Post = ({title, summary, cover, content, createdAt, author, _id}) => {
    let navigate = useNavigate();

    const viewPost = () =>{
        navigate(`/post/${_id}`)
    }
    
  return (
    <Box
      sx={{
        width: "80vw",
        margin: "0 auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"start",
        marginBottom: "6vh",
      }}
    >
      <img
        style={{ width: "30rem", height: "25vh", marginRight: "2vw" , cursor:"pointer"}}
        src={cover} alt="post img" onClick={viewPost}
      />
      <Box sx={{width:"70rem"}}>
        <Typography sx={{ fontSize: "1.6rem", margin: 0, cursor:"pointer" }} onClick={viewPost}>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginBottom: "1vh",
            color: "#888",
            alignItems: "center",
            fontSize: ".7rem",
            fontWeight: "bold",
            margin: "1vh 0",
          }}
        >
          <Link  sx={{ color: "#333", textDecoration: "none", fontSize:".8rem", marginRight:"5px" }}> by @{author}, </Link>
          <Typography sx={{fontSize:".8rem"}}>{formatISO9075(new Date(createdAt))}</Typography>
        </Box>
        <Typography sx={{ margin: 0, lineHeight: "1.4rem" }}>
          {summary}
        </Typography>
      </Box>
    </Box>
  );
};

export default Post;
