const express = require("express");
const router = express.Router();

// //MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");

// //CONTROLLERS
const {
  getAllUserNotifications,
  updateNotification,
} = require("../controllers/notification.controller");

router.route("/").get(userAuth, getAllUserNotifications);
router.route("/").put(userAuth, updateNotification);

module.exports = router;
