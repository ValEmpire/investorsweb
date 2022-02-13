const express = require("express");
const router = express.Router();

//VALIDATION
const { validate } = require("../validators");
const { investmentSchema } = require("../validators/investment.validator");

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");
const { checkProjectMiddleware } = require("../middlewares/project.middleware");
const {
  investmentMiddleware,
  checkInvestmentMiddleware,
} = require("../middlewares/investment.middleware");

//CONTROLLERS
const {
  createInvestment,
  updateInvestment,
  deleteInvestment,
  getAllInvestments,
  getInvestment,
} = require("../controllers/investment.controller");

const { submitStripePayment } = require("../controllers/stripe.controller");

//ROUTES
router
  .route("/")
  .get(userAuth, getAllInvestments)
  .post(
    userAuth,
    validate(investmentSchema),
    checkProjectMiddleware,
    investmentMiddleware,
    submitStripePayment,
    createInvestment
  );

router
  .route("/:investmentId")
  .get(userAuth, checkInvestmentMiddleware, getInvestment)
  .put(
    userAuth,
    validate(investmentSchema),
    checkProjectMiddleware,
    checkInvestmentMiddleware,
    updateInvestment
  )
  .delete(userAuth, checkInvestmentMiddleware, deleteInvestment);

module.exports = router;
