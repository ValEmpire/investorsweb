const express = require("express");
const router = express.Router();

//VALIDATION

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");

//CONTROLLERS
const {
  createConnectedAccount,
  getAllCards,
} = require("../controllers/stripe.controller");

//ROUTES
router.route("/all-cards").get(userAuth, getAllCards);

router.route("/create-account").post(userAuth, createConnectedAccount);

module.exports = router;
