const model = require("../models");
const User = model.user;
const UserDetail = model.userDetail;
const Image = model.image;
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers");

module.exports = {
  register: async (req, res) => {
    try {
      if (req.user) throw new Error("Email is already taken.");

      const { firstName, lastName, email, password } = req.validatedBody;

      const hashPassword = bcrypt.hashSync(password, 12);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      const token = generateToken(newUser.id);

      res.cookie("token", token, {
        maxAge: 86400000, // 24hrs
        httpOnly: true,
      });

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  logOut: async (req, res) => {
    try {
      res.clearCookie("token");

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  logIn: async (req, res) => {
    try {
      if (!req.user) throw new Error("Invalid credentials.");

      const hashPassword = req.user.password;

      const { password } = req.body;

      const isMatch = bcrypt.compareSync(password, hashPassword);

      if (!isMatch) throw new Error("Email and password do not match.");

      const token = generateToken(req.user.id);

      res.cookie("token", token, {
        maxAge: 86400000, // 24hrs
        httpOnly: true,
      });

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: UserDetail,
          },
          {
            model: Image,
          },
        ],
      });

      return res.status(200).send({
        success: true,
        user,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};
