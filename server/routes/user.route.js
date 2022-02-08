const express = require("express");
const router = express.Router();

const {
  register,
  logOut,
  logIn,
  getUser,
  updateUser,
} = require("../controllers/user.controller");

const { validate } = require("../validators");

const {
  userRegisterSchema,
  userLoginSchema,
  updateUserSchema,
} = require("../validators/user.validator");

const { userMiddleware, userAuth } = require("../middlewares/user.middleware");

router
  .route("/")
  .get(userAuth, getUser)
  .put(userAuth, validate(updateUserSchema), userMiddleware, updateUser);

router
  .route("/register")
  .post(validate(userRegisterSchema), userMiddleware, register);

router.route("/logout").post(logOut);

router.route("/login").post(validate(userLoginSchema), userMiddleware, logIn);

module.exports = router;
