import axios from "../setup/axios";

const createCategory = (data) => {
  return axios.post("/api/v1/category/create", data);
};

const getAllCategory = () => {
  return axios.get("/api/v1/category/read");
};
const deleteCategory = (id) => {
  return axios.delete("/api/v1/category/delete", { data: { id } });
};
export { createCategory, getAllCategory, deleteCategory };
