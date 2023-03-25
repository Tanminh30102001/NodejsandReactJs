import {
  createNewCategory,
  readCategoryApi,
  deleteCategoryApi,
} from "../service/categoryService";
const createCategory = async (req, res) => {
  try {
    let data = await createNewCategory(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};
const readCategory = async (req, res) => {
  try {
    let data = await readCategoryApi(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    let data = await deleteCategoryApi(req.body.id);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};
module.exports = { createCategory, readCategory, deleteCategory };
