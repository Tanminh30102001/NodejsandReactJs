import {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserItem,
  getUserWithPaginate,
} from "../service/userApiService.js";
const read = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      let data = await getUserWithPaginate(page, limit);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT,
      });
    } else {
      let data = await getAllUser();
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};
const create = async (req, res) => {
  try {
    let data = await createNewUser(req.body);
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
const update = async (req, res) => {
  try {
    let data = await updateUser(req.body);
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
const deletee = async (req, res) => {
  try {
    let data = await deleteUser(req.body.id);
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
const getSigleUser = async (req, res) => {
  try {
    let data = await getUserItem(+req.params.id);
    if (+req.params.id) {
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT,
      });
    } else {
      return res.status(200).json({
        EM: "ID doesn't exist", //error message
        EC: data.EC, //error code
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: {},
    });
  }
};
const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "ok",
    EC: 0,
    DT: {
      id: req.user.id,
      access_token: req.token,
      role: req.user.role,
      email: req.user.email,
      username: req.user.username,
      groupID: req.user.groupID,
    },
  });
};
module.exports = {
  read,
  create,
  update,
  deletee,
  getSigleUser,
  getUserAccount,
};
