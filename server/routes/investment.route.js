const express = require("express");
const router = express.Router();

/**
 * Validators
 */
const { validate } = require("../validators");
const { investmentSchema } = require("../validators/investment.validator");

/**
 * Middlewares
 */
const { userAuth } = require("../middlewares/user.middleware");
const {
  checkProjectMiddleware,
  projectMiddleware,
} = require("../middlewares/project.middleware");
const {
  investmentMiddleware,
  checkInvestmentMiddleware,
} = require("../middlewares/investment.middleware");

/**
 * Controller
 */
const {
  createInvestment,
  updateInvestment,
  deleteInvestment,
  getAllInvestments,
  getInvestment,
  findProjectInvestment,
  getAllProjectInvestments,
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

/**
 * Endpoints
 */
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

router
  .route("/project/:projectId")
  .get(userAuth, investmentMiddleware, findProjectInvestment);

router
  .route("/project/all/:projectId")
  .get(userAuth, projectMiddleware, getAllProjectInvestments);

module.exports = router;
