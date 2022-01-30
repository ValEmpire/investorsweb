const express = require("express");
const router = express.Router();

const { register, logOut, logIn } = require("../controllers/user.controller");

const { userMiddleware } = require("../middlewares/user.middleware");

router.route("/register").post(userMiddleware, register);

router.route("/logout").post(logOut);

router.route("/login").post(userMiddleware, logIn);

module.exports = router;
