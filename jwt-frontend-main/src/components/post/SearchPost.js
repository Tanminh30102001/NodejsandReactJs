import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchPost } from "../../services/postService";
import Heading from "../layout/Heading";
import PostItem from "./PostItem";

const SearchPost = () => {
  const location = useLocation();
  const [postList, setPostList] = useState([]);
  const fetchPost = async () => {
    const res = await searchPost(location.search);
    if (+res.EC === 0) {
      setPostList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [location.search]);
  return (
    <div className="container mt-3">
      <Heading>
        {postList?.length > 0 ? "Your search result" : "Not found your result!"}
      </Heading>
      <div className="grid-layout grid-layout--primary">
        {postList?.length > 0 &&
          postList.map((post) => {
            return <PostItem post={post}></PostItem>;
          })}
      </div>
    </div>
  );
};

export default SearchPost;
