const express = require("express");
const router = express.Router();

//VALIDATION

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");

//CONTROLLERS
const {
  createInvestorAccount,
  getAllCards,
  addCard,
  deleteCard,
  updateCard,
  createPaymentIntent,
  createCustomerAccount,
} = require("../controllers/stripe.controller");

//ROUTES
router.route("/all-cards").get(userAuth, getAllCards);

router.route("/create-account").post(userAuth, createInvestorAccount);

router.route("/add-card").post(userAuth, addCard);

router.route("/delete-card").delete(userAuth, deleteCard, getAllCards);

router.route("/update-card").put(userAuth, updateCard, getAllCards);

router.route("/create-payment-intent").post(userAuth, createPaymentIntent);

router.route("/create-customer").post(userAuth, createCustomerAccount);

module.exports = router;
