import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByUsername } from "../../services/postService";
import Heading from "../layout/Heading";
import PostItem from "../post/PostItem";

const AuthorPage = () => {
  const { username } = useParams();
  const [postList, setPostList] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const fetchPost = async () => {
    const res = await getPostByUsername(username);
    if (+res.EC === 0) {
      setPostList(res.DT);
      setAuthorName(res.DT[0].User.username);
    } else {
      console.log(res.EM);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="container">
      <div className="mt-3">
        <Heading>Author: {authorName}</Heading>
        <div className="grid-layout grid-layout--primary">
          {postList.length > 0 &&
            postList.map((post) => {
              return <PostItem post={post}></PostItem>;
            })}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
