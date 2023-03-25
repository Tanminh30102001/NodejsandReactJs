import express from "express";
import {
  handleLogin,
  handleReigster,
  handleLogout,
} from "../controller/apiController";
import { readFunc, createFunc } from "../controller/groupController";
import {
  read,
  create,
  update,
  deletee,
  getSigleUser,
  getUserAccount,
} from "../controller/userController";
import {
  readRole,
  createRole,
  updateRole,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
} from "../controller/roleController";
import { checkUserJwt, checkUserPermission } from "../middleware/JwtAction";
import {
  createCategory,
  readCategory,
  deleteCategory,
} from "../controller/categoryController";
import {
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
} from "../controller/postController";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  // router.all("*", );
  router.post("/register", handleReigster);
  router.post("/login", handleLogin);
  router.post("/logout", handleLogout);
  router.get("/account", checkUserJwt, checkUserPermission, getUserAccount);

  //user routes
  router.get("/user/read", checkUserJwt, checkUserPermission, read);
  router.post("/user/create", checkUserJwt, checkUserPermission, create);
  router.put("/user/update", checkUserJwt, checkUserPermission, update);
  router.delete("/user/delete", checkUserJwt, checkUserPermission, deletee);
  router.get("/user/read/:id=?", getSigleUser);

  //role routes
  router.get("/role/read", checkUserJwt, checkUserPermission, readRole);
  router.post("/role/create", checkUserJwt, checkUserPermission, createRole);
  router.put("/role/update", checkUserJwt, checkUserPermission, updateRole);
  router.delete("/role/delete", checkUserJwt, checkUserPermission, deleteRole);
  router.get(
    "/role/by-group",
    checkUserJwt,
    checkUserPermission,
    getRoleByGroup
  );
  router.post(
    "/role/assign-to-group",
    checkUserJwt,
    checkUserPermission,
    assignRoleToGroup
  );

  //group routes
  router.get("/group/read", checkUserJwt, checkUserPermission, readFunc);
  router.post("/group/create", checkUserJwt, checkUserPermission, createFunc);

  //category routes
  router.get("/category/read", checkUserJwt, checkUserPermission, readCategory);
  router.delete(
    "/category/delete",
    checkUserJwt,
    checkUserPermission,
    deleteCategory
  );
  router.post(
    "/category/create",
    checkUserJwt,
    checkUserPermission,
    createCategory
  );

  //posts routes
  router.get("/post/read/:slug=?", readPostIemBySlug);
  router.get("/post/read/category/:categoryID=?", readRelated);
  router.get("/post/read/post-category/:slug=?", readPostByCategory);
  router.get("/post/read/post-user/:username=?", readPostByUsername);
  router.get("/post/search", searchPost);
  router.get("/post/read", checkUserJwt, checkUserPermission, readPost);
  router.get("/post/hot", readHotPost);
  router.post("/post/create", checkUserJwt, checkUserPermission, createPost);
  router.put("/post/update", checkUserJwt, checkUserPermission, updatePost);
  router.delete("/post/delete", checkUserJwt, checkUserPermission, deletePost);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
