import {
  createNewUser,
  getUserList,
  deleteUser,
  getUserItem,
  updateUser,
} from "../service/userService";

const handleHello = (req, res) => {
  const name = "Linh";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  //model -> get data from database
  // console.log("req cookies", req.cookies);
  const userList = await getUserList();
  return res.render("user.ejs", { userList });
};

// "INSERT INTO users SET ? ", data
const handleCreateNewUser = async (req, res) => {
  const { email, password, username } = req.body;
  await createNewUser(email, password, username);
  return res.redirect("/user");
};

const handleDeleteUser = (req, res) => {
  deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  const { id } = req.params;
  const userItem = await getUserItem(id);
  return res.render("user-update.ejs", { userItem });
};

const handleUpdateUser = (req, res) => {
  const { email, username, id } = req.body;
  updateUser(id, username, email);
  return res.redirect("/user");
};

module.exports = {
  handleHello,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
