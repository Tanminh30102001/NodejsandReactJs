import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { deletePost, getAllPost } from "../../services/postService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
const TablePostStyle = styled.div`
  .post-detail {
    img {
      width: 66px;
      height: 55px;
      border-radius: 8px;
      object-fit: cover;
    }
    time {
      font-size: 12px;
    }
  }
`;
const TablePost = () => {
  const [postList, setPostList] = useState([]);
  const leader = 1;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const fetchAllPost = async () => {
    const res = await getAllPost();
    if (+res.EC === 0) {
      setPostList(res.DT);
    } else {
      console.log(res.EM);
    }
  };
  const handleDeleteUser = async (post) => {
    if (
      +user?.account?.groupID === leader ||
      user?.account.id === post.User.userID
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const res = await deletePost({
            postID: post.postID,
            publicID: post.publicID,
          });
          if (+res.EC === 0) {
            toast.success(res.EM);
            await fetchAllPost();
          } else {
            toast.error(res.EM);
          }
        }
      });
    }
  };
  useEffect(() => {
    fetchAllPost();
  }, []);
  return (
    <TablePostStyle>
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Post</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postList?.length > 0 ? (
            postList.map((post) => {
              return (
                <tr key={v4()}>
                  <td>{post.postID}</td>
                  <td className="post-detail">
                    <div className="gap-3 d-flex align-items-center">
                      <img src={post.photoURL || "/default-image.png"} alt="" />
                      <div className="flex-1">
                        <p title={post.name}>
                          {post.name.length < 48
                            ? post.name
                            : `${post.name.slice(0, 48)}...`}
                        </p>
                        <time className="text-sm text-gray-400">
                          {post.createdAt.slice(0, 10)}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>{post.Category.name}</td>
                  <td>{post.User.username}</td>
                  <td className="">
                    <div className="gap-2 d-flex align-items-center justify-content-center">
                      <svg
                        style={{ cursor: `pointer` }}
                        width="30"
                        onClick={() => navigate(`/post/detail/${post.slug}`)}
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z"
                          stroke="#26de81"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z"
                          stroke="#26de81"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        style={{
                          cursor: `${
                            +user?.account?.groupID === leader
                              ? "pointer"
                              : +user?.account.id === +post.User.userID
                              ? "pointer"
                              : "context-menu"
                          }`,
                        }}
                        width="30"
                        onClick={() =>
                          navigate(
                            `${
                              user?.account?.groupID === leader
                                ? `/post/update/${post.slug}`
                                : user?.account.id === post.User.userID
                                ? `/post/update/${post.slug}`
                                : `/posts`
                            }`
                          )
                        }
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.99609 8.5H11.4961"
                          stroke="#f7b731"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.99609 16.5H7.99609"
                          stroke="#f7b731"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.4961 16.5H14.4961"
                          stroke="#f7b731"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.9961 12.03V16.11C21.9961 19.62 21.1061 20.5 17.5561 20.5H6.43609C2.88609 20.5 1.99609 19.62 1.99609 16.11V7.89C1.99609 4.38 2.88609 3.5 6.43609 3.5H14.4961"
                          stroke="#f7b731"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.0761 4.13006L15.3661 7.84006C15.2261 7.98006 15.0861 8.26006 15.0561 8.46006L14.8561 9.88006C14.7861 10.3901 15.1461 10.7501 15.6561 10.6801L17.0761 10.4801C17.2761 10.4501 17.5561 10.3101 17.6961 10.1701L21.4061 6.46006C22.0461 5.82006 22.3461 5.08006 21.4061 4.14006C20.4561 3.19006 19.7161 3.49006 19.0761 4.13006Z"
                          stroke="#f7b731"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.5461 4.65991C18.8661 5.78991 19.7461 6.66991 20.8661 6.97991"
                          stroke="#f7b731"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        style={{
                          cursor: `${
                            +user?.account?.groupID === leader
                              ? "pointer"
                              : +user?.account.id === +post.User.userID
                              ? "pointer"
                              : "context-menu"
                          }`,
                        }}
                        onClick={() => handleDeleteUser(post)}
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 8.5H13.5"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 16.5H8"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5 16.5H14.5"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 12.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H13.5"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.3086 8.18957L21.1886 4.30957"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21.1886 8.18957L17.3086 4.30957"
                          stroke="#eb3b5a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr key={v4()}>
              <td>Not found users</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </TablePostStyle>
  );
};

export default TablePost;
