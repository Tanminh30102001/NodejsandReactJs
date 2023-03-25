// import axios from "axios";
import axios from "../setup/axios";

const registerService = (email, username, phone, password) => {
  return axios.post("/api/v1/register", {
    email,
    username,
    phone,
    password,
  });
};

const loginService = (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const logoutUser = () => {
  return axios.post("/api/v1/logout");
};

const fecthAllUser = () => {
  return axios.get("/api/v1/user/read");
};

const getUserWithPaginate = (page = 1, limit = 3) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (id) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: { id },
  });
};

const createUser = (userData) => {
  return axios.post("/api/v1/user/create", userData);
};

const fetchSignleUser = (userID) => {
  return axios.get(`/api/v1/user/read/${userID}`);
};
// /user/update
const updateUser = (userData) => {
  return axios.put("/api/v1/user/update", {
    id: userData.id,
    username: userData.username,
    address: userData.address,
    sex: userData.sex,
    groupID: userData.group,
  });
};

const getUserAccount = () => {
  return axios.get("/api/v1/account");
};
export {
  registerService,
  loginService,
  fecthAllUser,
  getUserWithPaginate,
  deleteUser,
  createUser,
  fetchSignleUser,
  updateUser,
  getUserAccount,
  logoutUser,
};
