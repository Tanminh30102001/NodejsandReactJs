import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird"; // use for mysql2 promise
import db from "../models/";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt); //hash password
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  //User is model
  try {
    await db.User.create({
      email,
      password: hashPass,
      username,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  //test relationship
  const newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"], //get every data want
    // include: db.Group, //get data from table Group, if( groupid = 1) -> show data of group 1
    include: { model: db.Group, attributes: ["name", "desc"] },
    raw: true, // return object data
    nest: true, // convert group data to object
  });

  const role = await db.Role.findAll({
    include: {
      model: db.Group,
      where: { id: 1 },
      attributes: ["name", "desc"], // find in table mapping
    },
    raw: true,
    nest: true,
  });
  let users = await db.User.findAll();
  return users;
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "decentralization",
  //   Promise: bluebird,
  // });
  // const [rows, fields] = await connection.execute("SELECT * FROM user");
  // return rows;
};

const getUserItem = async (userID) => {
  const userItem = await db.User.findOne({
    where: {
      id: userID,
    },
  });
  return userItem;
};

const deleteUser = async (userID) => {
  await db.User.destroy({
    where: {
      id: userID,
    },
  });
};

const updateUser = async (userID, username, email) => {
  let user = await db.User.update(
    {
      username,
      email,
    },
    {
      where: {
        id: userID,
      },
    }
  );
  return user;
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserItem,
  updateUser,
};

/**
 *  const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "decentralization",
  //   Promise: bluebird,
  // });
  // const [rows, fields] = await connection.execute(
  //   "INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
  //   [email, hashPass, username]
  // );
  // return rows;
 */
