import db from "../models/";
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRole } from "./JwtService";
import { createJwt } from "../middleware/JwtAction";
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

const registerNewUser = async (rawUserData) => {
  //check email/ phone already exist
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
  //hash user password
  const hashPass = hashPassword(rawUserData.password);
  //create new user
  try {
    await db.User.create({
      email: rawUserData.email,
      password: hashPass,
      phone: rawUserData.phone,
      username: rawUserData.username,
      groupID: 4,
    });
    return {
      EM: "Create user successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong in service...",
      EC: -1,
    };
  }
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword); // true
};

const handleUserLogin = async (rawUserData) => {
  try {
    const userItem = await db.User.findOne({
      where: {
        // attributes: ["id", "username", "email"],
        [Op.or]: [
          { email: rawUserData.valueLogin },
          { phone: rawUserData.valueLogin },
        ],
      },
    });
    if (userItem) {
      const checkCorrectPassword = checkPassword(
        rawUserData.password,
        userItem.password
      );
      const role = await getGroupWithRole(userItem);
      let payload = {
        id: userItem.id,
        email: userItem.email,
        username: userItem.username,
        groupID: userItem.groupID,
        role,
      };
      const token = createJwt(payload);
      if (checkCorrectPassword) {
        return {
          EM: "Login successfully!",
          EC: 0,
          DT: {
            access_token: token,
            role,
            account: {
              id: userItem.id,
              email: userItem.email,
              username: userItem.username,
              address: userItem.address,
              sex: userItem.sex,
              phone: userItem.phone,
            },
          },
        };
      } else {
        return {
          EM: "Your password is incorrect!",
          EC: 1,
          DT: {},
        };
      }
    }
    return {
      EM: "Email or phone doesn't exist!",
      EC: 1,
      DT: {},
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong in service...",
      EC: -1,
    };
  }
};
module.exports = { registerNewUser, handleUserLogin };
