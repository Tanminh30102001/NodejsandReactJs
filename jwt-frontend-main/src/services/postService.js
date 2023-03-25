import axios from "../setup/axios";

const getAllPost = () => {
  return axios.get("/api/v1/post/read");
};

const createPost = (data) => {
  return axios.post("/api/v1/post/create", data);
};
const searchPost = (keyword) => {
  return axios.get(`/api/v1/post/search${keyword}`);
};

const getPostItem = (slug) => {
  return axios.get(`/api/v1/post/read/${slug}`);
};

const getPostHot = () => {
  return axios.get(`/api/v1/post/hot`);
};

const getPostRelated = (categoryID) => {
  return axios.get(`/api/v1/post/read/category/${categoryID}`);
};
const getPostBySlugCategory = (slug) => {
  return axios.get(`/api/v1/post/read/post-category/${slug}`);
};
const getPostByUsername = (username) => {
  return axios.get(`/api/v1/post/read/post-user/${username}`);
};

const updatePost = (data) => {
  return axios.put(`/api/v1/post/update`, data);
};

const deletePost = (post) => {
  return axios.delete(`/api/v1/post/delete`, {
    data: {
      postID: post.postID,
      publicID: post.publicID,
    },
  });
};

export {
  createPost,
  getAllPost,
  getPostItem,
  getPostRelated,
  getPostHot,
  updatePost,
  deletePost,
  getPostBySlugCategory,
  getPostByUsername,
  searchPost,
};
