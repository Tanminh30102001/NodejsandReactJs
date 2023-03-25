import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostCategoryStyle = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: rgb(117, 117, 117);
  font-size: 14px;
  font-weight: 600;
  a {
    display: block;
  }
  border: 1px solid gray;
  /* white-space: nowrap;
  overflow: hidden; //k cho dai qua
  text-overflow: ellipsis; */
`;
const PostCategory = ({
  children,
  className = "",
  category,
  // to = "/",
}) => {
  return (
    <NavLink to={`/category/${category?.slug}`}>
      <PostCategoryStyle className={`post-category ${className}`}>
        {children}
      </PostCategoryStyle>
    </NavLink>
  );
};

export default PostCategory;
