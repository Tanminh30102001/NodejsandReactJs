const { getGroups, createGroupApi } = require("../service/groupService");

const readFunc = async (req, res) => {
  try {
    let data = await getGroups();
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

const createFunc = async (req, res) => {
  try {
    let data = await createGroupApi(req.body);
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

module.exports = { readFunc, createFunc };
