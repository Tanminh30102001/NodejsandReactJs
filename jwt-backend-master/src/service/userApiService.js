import db from "../models";
const salt = bcrypt.genSaltSync(10);
import bcrypt from "bcryptjs";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "desc"] },
      raw: true,
      nest: true,
    });
    if (users) {
      return {
        EM: "Get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPaginate = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: +offset, //page = 5, limit = 2 -> offset = 8
      limit: +limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "desc", "id"] },
    });
    let data = {
      totalItems: count, //total items
      totalPage: Math.ceil(+count / +limit),
      users: rows, //data of 1 page
    };
    return {
      EM: "Get pagination successfully",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const checkEmailExist = async (email) => {
  const isExistUser = await db.User.findOne({
    where: { email },
  });
  if (isExistUser) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (phone) => {
  const isExistUser = await db.User.findOne({
    where: { phone },
  });
  if (isExistUser) {
    return true;
  }
  return false;
};
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt); //hash password
  return hashPassword;
};
const createNewUser = async (rawUserData) => {
  const isPhoneExist = await checkPhoneExist(rawUserData.phone);
  const isEmailExist = await checkEmailExist(rawUserData.email);
  if (isEmailExist) {
    return {
      EM: "Email already exist",
      EC: 1,
      DT: { isEmailExist },
    };
  }
  if (isPhoneExist) {
    return {
      EM: "Phone number already exist",
      EC: 1,
      DT: { isPhoneExist },
    };
  }
  const hashPass = hashPassword(rawUserData.password);
  try {
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hashPass,
      address: rawUserData.address,
      sex: rawUserData.sex,
      groupID: rawUserData.group,
    });
    return {
      EM: "Create user successfully",
      EC: 0,
      DT: {},
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};
const updateUser = async (data) => {
  try {
    if (!data.groupID) {
      return {
        EM: "Update error with group ID",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupID: data.groupID,
      });
      return {
        EM: "Update user sucessully",
        EC: 0,
        DT: "user",
      };
    } else {
      return {
        EM: "User not found",
        EC: 1,
        DT: "user",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};
const deleteUser = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete user successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User doesn't exist",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: [],
    };
  }
};
const getUserItem = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id },
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "desc"] },
    });
    return {
      EM: "Get user successfully",
      EC: 0,
      DT: user,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with services",
      EC: 1,
      DT: {},
    };
  }
};
module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPaginate,
  getUserItem,
};
