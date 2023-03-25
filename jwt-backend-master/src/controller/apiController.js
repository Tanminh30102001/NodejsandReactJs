const {
  registerNewUser,
  handleUserLogin,
} = require("../service/loginRegisterService");

const handleReigster = async (req, res) => {
  const { email, password, phone, username } = req.body;
  if (!email || !password || !phone) {
    return res.status(200).json({
      EM: "Missing required parameters", //error message
      EC: -1, //error code
      DT: "",
    });
  }
  try {
    //service create user
    let data = await registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    const data = await handleUserLogin(req.body);
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //1hour
    });
    if (data && data?.DT?.access_token) {
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT,
      });
    }
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: -1, //error code
      DT: "",
    });
  }
};
const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Clear cookie done", //error message
      EC: 0, //error code
      DT: "",
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
module.exports = { handleReigster, handleLogin, handleLogout };
