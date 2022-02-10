const express = require("express");
const router = express.Router();

//VALIDATION

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");

//CONTROLLERS
const {
  createConnectedAccount,
  getAllCards,
  addCard,
  deleteCard,
  updateCard,
} = require("../controllers/stripe.controller");

//ROUTES
router.route("/all-cards").get(userAuth, getAllCards);

router.route("/create-account").post(userAuth, createConnectedAccount);

router.route("/add-card").post(userAuth, addCard);

router.route("/delete-card").delete(userAuth, deleteCard, getAllCards);

router.route("/update-card").put(userAuth, updateCard, getAllCards);

module.exports = router;
