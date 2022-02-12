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
  getLink,
} = require("../controllers/stripe.controller");

//ROUTES
router.route("/create-account").post(userAuth, createInvestorAccount);
router.route("/create-customer").post(userAuth, createCustomerAccount);

// cards
router.route("/all-cards").get(userAuth, getAllCards);
router.route("/add-card").post(userAuth, addCard);
router.route("/delete-card").delete(userAuth, deleteCard, getAllCards);
router.route("/update-card").put(userAuth, updateCard, getAllCards);

router.route("/generate-link").get(userAuth, getLink);

router.route("/create-payment-intent").post(userAuth, createPaymentIntent);

module.exports = router;
