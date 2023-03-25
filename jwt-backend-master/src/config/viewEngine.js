import express from "express";

/**
 *
 * @param {*} app -express app
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs"); //view engine use code html -> ejs
  app.set("views", "./src/views"); //store save code
};

export default configViewEngine;
