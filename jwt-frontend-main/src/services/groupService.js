import axios from "../setup/axios";

const fecthAllGroup = () => {
  return axios.get("/api/v1/group/read");
};

const createGroup = (data) => {
  return axios.post("/api/v1/group/create", data);
};
export { fecthAllGroup, createGroup };
