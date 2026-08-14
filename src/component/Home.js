import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import SearchComponent from "./SearchComponent";
import { Context } from "../App";
import HomeCard from "./HomeCard";
import API_BASE_URL from "../config";

const Home = () => {
  const {
    isSearchOpen,
    setSearchOpenClose,
    searchText,
    filterBy,
    sendSearchText,
    setCategoryItem,
  } = useContext(Context);

  const [posts, setPosts] = useState([]);
  const [searchedPost, setSearchedPost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [loader, setLoader] = useState(true);

  // ================================
  // Get All Posts
  // ================================

  const getAllPost = async () => {
    try {
      setLoader(true);

      const response = await fetch(
        `${API_BASE_URL.base_url}/post/getPost`
      );

      const result = await response.json();

      const postData = result?.posts || [];

      // Get unique categories
      const categories = [
        ...new Set(
          postData
            .map((item) => item?.category)
            .filter(Boolean)
        ),
      ];

      setCategoryItem(categories);
      setPosts(postData);
    } catch (error) {
      console.error("Error while fetching posts:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllPost();

    // eslint-disable-next-line
  }, []);

  // ================================
  // Search Posts
  // ================================

  useEffect(() => {
    const text = String(searchText || "")
      .trim()
      .toLowerCase();

    if (!text) {
      setSearchedPost([]);
      return;
    }

    const result = posts.filter((item) => {
      const title = String(
        item?.title || ""
      ).toLowerCase();

      return title.includes(text);
    });

    setSearchedPost(result);
  }, [searchText, posts]);

  // ================================
  // Filter Posts
  // ================================

  useEffect(() => {
    if (!filterBy) {
      setFilteredPost([]);
      return;
    }

    const category = String(filterBy).toLowerCase();

    const result = posts.filter((item) => {
      const itemCategory = String(
        item?.category || ""
      ).toLowerCase();

      return itemCategory.includes(category);
    });

    setFilteredPost(result);
  }, [filterBy, posts]);

  // ================================
  // Sort Posts
  // ================================

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  const sortedSearchedPost = [
    ...searchedPost,
  ].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  const sortedFilteredPost = [
    ...filteredPost,
  ].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  // ================================
  // Responsive Grid
  // ================================

  const postGridSx = {
    width: "100%",
    maxWidth: "1400px",

    margin: "40px auto",

    padding: {
      xs: "0 16px",
      sm: "0 24px",
      md: "0 30px",
      lg: "0 40px",
    },

    boxSizing: "border-box",

    display: "grid",

    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, minmax(0, 1fr))",
      md: "repeat(2, minmax(0, 1fr))",
      lg: "repeat(3, minmax(0, 1fr))",
      xl: "repeat(4, minmax(0, 1fr))",
    },

    gap: {
      xs: "20px",
      sm: "24px",
      md: "28px",
      lg: "32px",
    },
  };

  // ================================
  // Loading
  // ================================

  if (loader) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <Nav />

        <Box
          sx={{
            minHeight: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // ================================
  // Filtered Posts
  // ================================

  if (filterBy) {
    setSearchOpenClose(false);

    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <Nav />

        {sortedFilteredPost.length > 0 ? (
          <Box sx={postGridSx}>
            {sortedFilteredPost.map(
              (post, index) => (
                <HomeCard
                  item={post}
                  key={post?._id || index}
                />
              )
            )}
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                color: "gray",
                fontSize: {
                  xs: "20px",
                  sm: "24px",
                  md: "28px",
                },
              }}
            >
              No data found for applied filter
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  // ================================
  // Home
  // ================================

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Nav />

      {/* Search Component */}

      {isSearchOpen && (
        <SearchComponent
          findSearchText={sendSearchText}
        />
      )}

      {/* ================================
          Search Results
      ================================= */}

      {String(searchText || "").trim() ? (
        sortedSearchedPost.length > 0 ? (
          <Box sx={postGridSx}>
            {sortedSearchedPost.map(
              (post, index) => (
                <HomeCard
                  item={post}
                  key={post?._id || index}
                />
              )
            )}
          </Box>
        ) : (
          <Box
            sx={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                color: "gray",
                fontSize: {
                  xs: "20px",
                  sm: "24px",
                  md: "28px",
                },
              }}
            >
              There is no such item which you
              searched!!
            </Typography>
          </Box>
        )
      ) : (
        /* ================================
           All Posts
        ================================= */

        <Box sx={postGridSx}>
          {sortedPosts.map((post, index) => (
            <HomeCard
              item={post}
              key={post?._id || index}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;