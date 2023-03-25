const {
  createNewRole,
  getAllRole,
  deleteRoleApi,
  getRoleByGroupApi,
  assignRoleToGroupApi,
} = require("../service/roleService");

const readRole = async (req, res) => {
  try {
    let data = await getAllRole();
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

const createRole = async (req, res) => {
  try {
    let data = await createNewRole(req.body);
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
const updateRole = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    let data = await deleteRoleApi(req.body.id);
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

const getRoleByGroup = async (req, res) => {
  try {
    let data = await getRoleByGroupApi(+req.query.groupID);
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

const assignRoleToGroup = async (req, res) => {
  let data = await assignRoleToGroupApi(req.body);
  try {
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
  readRole,
  createRole,
  updateRole,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
