import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllPost } from "../../services/postService";
import Heading from "../layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [postList, setPostList] = useState([]);
  const fetchPostFeature = async () => {
    const res = await getAllPost();
    if (+res.EC === 0) {
      setPostList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const filterPost = postList.filter((post) => {
    return post.hot === 1;
  });
  useEffect(() => {
    fetchPostFeature();
  }, []);
  return (
    <HomeFeatureStyles className="mt-5 home-block">
      <div className="container">
        <Heading>Feature post</Heading>
        <div className="grid-layout">
          {filterPost?.length > 0 &&
            filterPost
              ?.slice(-3)
              ?.reverse()
              ?.map((post) => {
                return (
                  <PostFeatureItem
                    key={post.postID}
                    data={post}
                  ></PostFeatureItem>
                );
              })}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
