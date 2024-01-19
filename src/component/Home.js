import { Box, Typography } from "@mui/material";
import React, {useEffect, useState } from "react";
import Nav from "./Nav";
import Post from "./Post";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  console.log(process.env)
  const [posts, setPosts] = useState({});
  let [loader, setLoader] = useState(true);
  let [selectCategory, setSelectCategory] = useState([]);
  let [allCategory, setAllCategory] = useState([]);
  let [clear, setClear] = useState(true);
  useEffect(() => {
    getAllPost();
    findCategory();
  },[]);

  


  
  let findCategory = async () => {
    let response = await fetch("https://blog-backend-i14c.onrender.com/post/getCategory");
    let result = await response.json();
    setAllCategory([...result.category]);
  };

  let getAllPost = async () => {
    let response = await fetch("https://blog-backend-i14c.onrender.com/post/getPost");
    let result = await response.json();
    setPosts([...result.posts]);
    if (result.posts) {
      setLoader(false);
    }
  };
  if (posts.length)
    posts.sort((a, b) => {
      return new Date(new Date(b.createdAt) - new Date(a.createdAt));
    });

  const handleCategory = (item) => {
    if (!selectCategory.find((cat) => cat === item))
      setSelectCategory([...selectCategory, item]);
  };

  const handleRemoveCategory = (item) => {
    let newArr = selectCategory.filter((cat) => {
      clear ? setClear(false) : setClear(true);
      return cat !== item;
    });

    setSelectCategory([...newArr]);
    if (item === "all") {
      let arr = [];
      setSelectCategory([...arr]);
    }
  };
  return (
    <Box>
      <Nav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: "8px",
          bgcolor: "#f2f2f2",
          width: "80vw",
          margin: "0 auto",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        Category:
        {allCategory.length > 0 &&
          allCategory.map((item, index) => {
            return (
              <Typography
                key={index}
                sx={{
                  bgcolor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  ":hover": { bgcolor: "yellow" },
                }}
                onClick={() => handleCategory(item.category)}
              >
                {item.category}
              </Typography>
            );
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: "8px",
          width: "80vw",
          margin: "0 auto",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        {selectCategory.length > 0 &&
          selectCategory.map((item) => {
            return (
              <Box
                sx={{
                  padding: "5px 5px 5px 10px",
                  bgcolor: "#e6e6e6",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Typography>{item}</Typography>
                <CloseIcon
                  onClick={() => handleRemoveCategory(item)}
                  sx={{
                    bgcolor: "#cccccc",
                    padding: "3px",
                    borderRadius: "50%",
                    ":hover": { bgcolor: "#a6a6a6" },
                  }}
                />
              </Box>
            );
          })}
        {selectCategory.length > 1 && (
          <Box
            sx={{
              padding: "5px 5px 5px 10px",
              bgcolor: "#e6e6e6",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>Clear all</Typography>
            <CloseIcon
              onClick={() => handleRemoveCategory("all")}
              sx={{
                bgcolor: "#cccccc",
                padding: "3px",
                borderRadius: "50%",
                ":hover": { bgcolor: "#a6a6a6" },
              }}
            />
          </Box>
        )}
      </Box>
      {loader && (
        <Box
          sx={{
            width: "80vw",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />{" "}
        </Box>
      )}

      {posts.length &&
        posts.map((post) => {
          return <Post {...post} />;
        })}
    </Box>
  );
};

export default Home;
