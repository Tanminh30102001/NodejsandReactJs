import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlugCategory } from "../../services/postService";
import Heading from "../layout/Heading";
import PostItem from "../post/PostItem";

const CategoryPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const fetchPost = async () => {
    const res = await getPostBySlugCategory(slug);
    if (+res.EC === 0) {
      setPostList(res.DT);
      setCategoryName(res.DT[0].Category.name);
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
        <Heading>Category: {categoryName}</Heading>
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

export default CategoryPage;
