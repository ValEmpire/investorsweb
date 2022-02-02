const express = require("express");
const router = express.Router();

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");
const {  checkCommentMiddleware } = require("../middlewares/comment.middleware");
const { commentLikeMiddleware } = require("../middlewares/commentLike.middleware");

//CONTROLLERS
const { toggleCommentLike } = require("../controllers/commentLike.controller");

//ROUTES
router
  .route("/:commentId")
  .post(userAuth, checkCommentMiddleware, commentLikeMiddleware, toggleCommentLike);

module.exports = router;