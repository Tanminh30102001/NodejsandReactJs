import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPostItem } from "../../services/postService";
import PostCategory from "./PostCategory";
import parse from "html-react-parser";
import PostMeta from "./PostMeta";
import PostRelated from "./PostRelated";
const DetailPostStyle = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
      }
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
    &-image {
      width: 700px;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: gray;
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;
const DetailPost = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const fetchPostInfo = async () => {
    const res = await getPostItem(slug);
    if (+res.EC === 0) {
      setPostInfo(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  useEffect(() => {
    fetchPostInfo();
  }, []);
  console.log();
  if (!postInfo) return;
  return (
    <DetailPostStyle>
      <div className="container">
        <div className="post-header">
          <div className="post-image">
            <img src={postInfo.photoURL} alt={""} loading="lazy" />
          </div>
          <div className="post-info">
            <PostCategory className="mb-6" category={postInfo.Category}>
              {postInfo?.Category?.name}
            </PostCategory>
            <h1 className="my-3 post-heading">{postInfo?.name}</h1>
            <PostMeta postInfo={postInfo} createdAt></PostMeta>
          </div>
        </div>
        <div className="post-content">
          <div className="entry-content">{parse(`${postInfo.content}`)}</div>
        </div>
        <PostRelated postInfo={postInfo}></PostRelated>
      </div>
    </DetailPostStyle>
  );
};

export default DetailPost;
