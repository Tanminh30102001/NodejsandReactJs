import express from "express";
import {
  handleCreateNewUser,
  handleHello,
  handleUserPage,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
} from "../controller/homeController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.get("/", handleHello);
  router.get("/user", handleUserPage);
  router.post("/users/create-user", handleCreateNewUser);
  router.post("/user/delete-user/:id", handleDeleteUser);
  router.get("/user/update-user/:id", getUpdateUserPage);
  router.post("/user/update-user", handleUpdateUser);

  return app.use("/", router);
};

export default initWebRoutes;
