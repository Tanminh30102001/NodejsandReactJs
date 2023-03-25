import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
  color: inherit;
  cursor: pointer;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-time {
    }
    &-author {
    }
  }
`;
const PostMeta = ({
  className,
  to = "/",
  postInfo,
  createdAt,
  categoryName,
}) => {
  const navigate = useNavigate();
  const content = postInfo?.content;
  const result = content
    ?.replace(/[<p>,</p>,<img,/>,<span>,</span>]/g, "")
    .split(" ");
  const time = Math.round(result?.length / 200);
  if (!postInfo) return;
  return (
    <>
      <PostMetaStyle className={`post-info ${className}`}>
        {createdAt && (
          <p className="post-time">{postInfo?.createdAt?.slice(0, 10)}</p>
        )}
        {categoryName && (
          <p onClick={() => navigate(`/category/${postInfo?.Category?.slug}`)}>
            {postInfo.Category.name}
          </p>
        )}
        <p className="post-dot"></p>
        <p onClick={() => navigate(`/author/${postInfo?.User.username}`)}>
          {postInfo?.User?.username}
        </p>
        <p>~ {time} phút đọc</p>
      </PostMetaStyle>
    </>
  );
};

export default PostMeta;
