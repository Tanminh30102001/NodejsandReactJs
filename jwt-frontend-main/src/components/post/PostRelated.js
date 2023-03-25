import React, { useEffect } from "react";
import { useState } from "react";
import { getPostRelated } from "../../services/postService";
import Heading from "../layout/Heading";
import PostItem from "./PostItem";
const PostRelated = ({ postInfo }) => {
  const [postListRelated, setPostListRelated] = useState([]);
  const fetchPostRelated = async () => {
    if (postInfo) {
      const categoryID = postInfo?.Category?.id;
      const res = await getPostRelated(+categoryID);
      if (+res?.EC === 0) {
        setPostListRelated(res?.DT);
      } else {
        console.log(res?.EM);
      }
    }
  };
  const filterPostListRelated = postListRelated.filter((post) => {
    return post.postID !== postInfo.postID;
  });
  useEffect(() => {
    fetchPostRelated();
  }, [postInfo]);
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {filterPostListRelated.length > 0 &&
          filterPostListRelated.map((post) => {
            return <PostItem post={post} key={post.slug}></PostItem>;
          })}
      </div>
    </div>
  );
};

export default PostRelated;
