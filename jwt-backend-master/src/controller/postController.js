const {
  createNewPost,
  readPostApi,
  readPostIemBySlugApi,
  readHotPostApi,
  readRelatedApi,
  updatePostApi,
  deletePostApi,
  readPostByCategoryApi,
  readPostByUsernameApi,
  searchPostApi,
} = require("../service/postService");

const createPost = async (req, res) => {
  try {
    let data = await createNewPost(req.files.file, req.body.data);
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

const readPost = async (req, res) => {
  try {
    let data = await readPostApi();
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
const readPostIemBySlug = async (req, res) => {
  try {
    let data = await readPostIemBySlugApi(req.params.slug);
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
const readHotPost = async (req, res) => {
  try {
    let data = await readHotPostApi();
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
const readRelated = async (req, res) => {
  if (req?.params?.categoryID === NaN) return;
  try {
    let data = await readRelatedApi(req?.params?.categoryID);
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
const readPostByCategory = async (req, res) => {
  try {
    let data = await readPostByCategoryApi(req?.params?.slug);
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
const readPostByUsername = async (req, res) => {
  try {
    let data = await readPostByUsernameApi(req?.params?.username);
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
const searchPost = async (req, res) => {
  try {
    let data = await searchPostApi(req?.query.keyword);
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
const updatePost = async (req, res) => {
  try {
    let data = await updatePostApi(
      req?.files?.file === null ? "" : req?.files?.file,
      req.body.data
    );
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

const deletePost = async (req, res) => {
  try {
    const data = await deletePostApi(req.body);
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

module.exports = {
  createPost,
  readPost,
  readPostIemBySlug,
  readHotPost,
  readRelated,
  updatePost,
  deletePost,
  readPostByCategory,
  readPostByUsername,
  searchPost,
};
