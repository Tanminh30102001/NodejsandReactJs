import jwt from "jsonwebtoken";
require("dotenv").config();

// const noneSecurePath = ["/", "/register", "login"];

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const createJwt = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkUserJwt = (req, res, next) => {
  // if (noneSecurePath.includes(req.path)) return next();
  const tokenFromHeaders = extractToken(req);
  let cookies = req.cookies;
  if (tokenFromHeaders) {
    let access_token =
      cookies && cookies.access_token ? cookies.access_token : tokenFromHeaders;
    let decoded = verifyToken(access_token);
    if (decoded) {
      req.user = decoded;
      // req.access_token = access_token;
      next();
    } else {
      return res.status(401).json({
        EM: "Not authenticated the user",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: -1,
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  // if (noneSecurePath.includes(req.path)) return next();
  if (req?.path === "/account") return next();
  if (req?.user) {
    let { email, role } = req?.user;
    let currentUrl = req?.path;
    const canAccess = role?.some((item) => item.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EM: "You don't have perrmisson to access this resource!",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = { createJwt, verifyToken, checkUserJwt, checkUserPermission };
