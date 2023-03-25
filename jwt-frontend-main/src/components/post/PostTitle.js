import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTitleStyle = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  cursor: pointer;
  a {
    display: block;
  }
  font-weight: 600;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;
const PostTitle = ({
  children,
  className = "",
  size = "normal",
  to = "/",
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <PostTitleStyle
      onClick={() => navigate(to)}
      size={size}
      className={`post-title ${className}`}
      {...props}
    >
      {children}
    </PostTitleStyle>
  );
};

export default PostTitle;
