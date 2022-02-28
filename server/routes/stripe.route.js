const express = require("express");
const router = express.Router();

/**
 * Middlewares
 */
const { userAuth } = require("../middlewares/user.middleware");

/**
 * Controllers
 */
const {
  getAllCards,
  addCard,
  deleteCard,
  updateCard,
  createPaymentIntent,
  getLink,
  getAccount,
} = require("../controllers/stripe.controller");

/**
 * Endpoints
 */
router.route("/get-account").get(userAuth, getAccount);

router.route("/all-cards").get(userAuth, getAllCards);
router.route("/add-card").post(userAuth, addCard);
router.route("/delete-card").delete(userAuth, deleteCard, getAllCards);
router.route("/update-card").put(userAuth, updateCard, getAllCards);

router.route("/generate-link").get(userAuth, getLink);

router.route("/create-payment-intent").post(userAuth, createPaymentIntent);

module.exports = router;
