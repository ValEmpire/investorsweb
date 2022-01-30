const express = require("express");
const router = express.Router();

const { validate } = require("../validators");

const {
  userRegisterSchema,
  userLoginSchema,
} = require("../validators/user.validator");

const { register, logOut, logIn } = require("../controllers/user.controller");

const { userMiddleware } = require("../middlewares/user.middleware");

router
  .route("/register")
  .post(validate(userRegisterSchema), userMiddleware, register);

router.route("/logout").post(logOut);

router.route("/login").post(validate(userLoginSchema), userMiddleware, logIn);

module.exports = router;
