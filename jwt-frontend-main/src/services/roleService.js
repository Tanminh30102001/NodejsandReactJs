import axios from "../setup/axios";
const createRole = (roleData) => {
  return axios.post("/api/v1/role/create", roleData);
};
const readRole = () => {
  return axios.get("api/v1/role/read");
};
const deleteRole = (id) => {
  return axios.delete("api/v1/role/delete", {
    data: { id },
  });
};
const getRoleByGroup = (id) => {
  return axios.get(`api/v1/role/by-group?groupID=${id}`);
};

const assignRoleToGroup = (data) => {
  return axios.post(`api/v1/role/assign-to-group`, data);
};
export { createRole, readRole, deleteRole, getRoleByGroup, assignRoleToGroup };
