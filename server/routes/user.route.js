const express = require("express");
const router = express.Router();

const {
  register,
  logOut,
  logIn,
  getUser,
} = require("../controllers/user.controller");

const { userMiddleware, userAuth } = require("../middlewares/user.middleware");

router.route("/").get(userAuth, getUser);

router.route("/register").post(userMiddleware, register);

router.route("/logout").post(logOut);

router.route("/login").post(userMiddleware, logIn);

module.exports = router;
