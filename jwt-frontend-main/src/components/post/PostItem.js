import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      width: 100% !important;
      display: block;
      margin-bottom: 20px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`;
const PostItem = ({ post }) => {
  const navigate = useNavigate();
  if (!post) return;
  return (
    <PostItemStyles>
      <img
        src={post.photoURL}
        alt=""
        className="post-image"
        onClick={() => navigate(`/post/detail/${[post.slug]}`)}
      />
      <PostCategory category={post.Category}>
        {post?.Category?.name}
      </PostCategory>
      <PostTitle size="normal" to={`post/detail/${post.slug}`}>
        {post.name}
      </PostTitle>
      {/* <PostTitle to={`/${post.slug}`}></PostTitle> */}
      <PostMeta createdAt postInfo={post}></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
