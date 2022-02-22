const model = require("../models");
const User = model.user;
const UserDetail = model.userDetail;
const Image = model.image;
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers");
const stripe = require("../stripe");

module.exports = {
  register: async (req, res) => {
    try {
      if (req.userFound) throw new Error("Email is already taken.");

      const { firstName, lastName, email, password } = req.validatedBody;

      const hashPassword = bcrypt.hashSync(password, 12);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      const token = generateToken(newUser.id);

      // stripe account
      const newAccount = await stripe.accounts.create({
        type: "express",
        country: "CA",
        email,
        capabilities: {
          acss_debit_payments: {
            requested: true,
          },
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
          legacy_payments: {
            requested: true,
          },
        },
      });

      const newCustomer = await stripe.customers.create({
        email: "investorsweblighthouse@gmail.com", // change this in production
        name: `${firstName} ${lastName}`,
      });

      newUser.accountId = newAccount.id;

      newUser.customerId = newCustomer.id;

      await newUser.save();

      res.cookie("token", token, {
        maxAge: 86400000, // 24hrs
        httpOnly: true,
      });

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err);

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
      if (!req.userFound) throw new Error("Invalid credentials.");

      const hashPassword = req.userFound.password;

      const { password } = req.body;

      const isMatch = bcrypt.compareSync(password, hashPassword);

      if (!isMatch) throw new Error("Email and password do not match.");

      const token = generateToken(req.userFound.id);

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
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { password, currentPassword, firstName, lastName } =
        req.validatedBody;

      // if password is present
      // then user wants to update password
      if (password) {
        const foundPassword = req.userFound.password;

        const isMatch = bcrypt.compareSync(currentPassword, foundPassword);

        if (!isMatch) throw new Error("Current password do not match.");

        const hashPassword = bcrypt.hashSync(password, 12);

        req.user.password = hashPassword;
      }

      req.user.firstName = firstName;

      req.user.lastName = lastName;

      await req.user.save();

      return res.status(200).send({
        success: true,
        user: req.user,
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
