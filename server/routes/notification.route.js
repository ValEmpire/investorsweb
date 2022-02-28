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
  getAllUserNotifications,
  updateNotification,
} = require("../controllers/notification.controller");

/**
 * Endpoints
 */
router.route("/").get(userAuth, getAllUserNotifications);
router.route("/").put(userAuth, updateNotification);

module.exports = router;
