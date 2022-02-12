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
  getLink,
  getAccount,
} = require("../controllers/stripe.controller");

//ROUTES
router.route("/get-account").get(userAuth, getAccount);

// cards
router.route("/all-cards").get(userAuth, getAllCards);
router.route("/add-card").post(userAuth, addCard);
router.route("/delete-card").delete(userAuth, deleteCard, getAllCards);
router.route("/update-card").put(userAuth, updateCard, getAllCards);

router.route("/generate-link").get(userAuth, getLink);

router.route("/create-payment-intent").post(userAuth, createPaymentIntent);

module.exports = router;
