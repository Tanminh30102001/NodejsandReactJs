import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import TablePost from "../table/TablePost";

const Posts = () => {
  const navigate = useNavigate();
  const { checkRolePosts } = useContext(UserContext);
  useEffect(() => {
    if (checkRolePosts === false) navigate("/");
  }, [checkRolePosts]);
  return (
    <div>
      <div className="container">
        <div className="my-2 d-flex justify-content-between">
          <h3 className="">Manage posts</h3>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/post/add-new")}
          >
            Add new post
          </button>
        </div>
        <TablePost></TablePost>
      </div>
    </div>
  );
};

export default Posts;
