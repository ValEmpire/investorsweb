const express = require("express");
const router = express.Router();

//VALIDATION

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");

//CONTROLLERS
const { createConnectedAccount } = require("../controllers/stripe.controller");

//ROUTES
router.route("/create-account").post(userAuth, createConnectedAccount);

module.exports = router;
