import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { getAllPost } from "../../services/postService";
import Heading from "../layout/Heading";
import PostItem from "../post/PostItem";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";
const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    const res = await getAllPost();
    if (+res.EC === 0) {
      setPosts(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const filterPost = posts?.filter((post) => {
    return post.hot === 0;
  });
  useEffect(() => {
    fetchPost();
  }, []);
  const postLastLength = filterPost?.length - 1;
  const postRecent = filterPost?.slice(postLastLength - 3, postLastLength);
  return (
    <HomeNewestStyles className="mt-3 home-block">
      <div className="container">
        <Heading>Newest post</Heading>
        <div className="layout">
          {filterPost?.length > 0 && (
            <PostNewestLarge
              key={v4()}
              post={filterPost[postLastLength]}
            ></PostNewestLarge>
          )}
          <div className="sidebar">
            {postRecent?.length > 0 &&
              postRecent.map((post) => {
                return <PostNewestItem key={v4()} post={post}></PostNewestItem>;
              })}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          {filterPost?.length > 0 &&
            filterPost.map((post) => {
              return <PostItem key={v4()} post={post}></PostItem>;
            })}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
