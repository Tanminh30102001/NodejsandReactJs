import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }

  .post {
    &-image {
      img {
        display: block;
        flex-shrink: 0;
        width: 180px;
        height: 130px;
        border-radius: 12px;
      }
    }
    &-category {
      margin-bottom: 8px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`;
const PostNewestItem = ({ post }) => {
  if (!post) return null;
  return (
    <PostNewestItemStyles>
      <div className="post-image">
        <img src={post.photoURL} alt="unsplash" />
      </div>
      <div className="post-content">
        <PostCategory category={post.Category} type="secondary">
          {post.Category.name}
        </PostCategory>
        <PostTitle>{post.name}</PostTitle>
        <PostMeta createdAt postInfo={post}></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
