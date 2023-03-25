import bodyParser from "body-parser";
import express from "express";
const fileUpload = require("express-fileupload");
var cloudinary = require("cloudinary").v2;
import connection from "./config/connectDB";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import cookieParser from "cookie-parser";
require("dotenv").config();

cloudinary.config({
  cloud_name: "dwkckmmr7",
  api_key: "573416668123248",
  api_secret: "7HRHCsa7CH7LBGfz8AGsWbLoI4Q",
  secure: true,
});

const app = express();
app.use(fileUpload()); //uploadfile
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser (middleware) -> get data by name from client or params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "50mb", extended: true }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000,
//   })
// );
app.use(bodyParser.text({ limit: "200mb" }));

//config cookie parser
app.use(cookieParser());

//test connect DB
connection();

//init web, api routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("hello " + PORT);
});
