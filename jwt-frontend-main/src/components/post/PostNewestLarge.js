import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      img {
        border-radius: 16px;
        width: 100%;
        height: 100%;
      }
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 12px;
    }
  }
`;

const PostNewestLarge = ({ post }) => {
  if (!post) return;
  return (
    <PostNewestLargeStyles>
      <div className="post-image">
        <img src={post?.photoURL} alt="unsplash" />
      </div>
      <PostCategory>{post?.Category?.name}</PostCategory>
      <PostTitle size="big" color="black">
        {post?.name}
      </PostTitle>
      <PostMeta createdAt postInfo={post}></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
