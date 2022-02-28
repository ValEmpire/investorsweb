const express = require("express");
const router = express.Router();

/**
 * Middlewares
 */
const { userAuth } = require("../middlewares/user.middleware");
const { checkCommentMiddleware } = require("../middlewares/comment.middleware");
const {
  commentLikeMiddleware,
} = require("../middlewares/commentLike.middleware");

/**
 * Controllers
 */
const { toggleCommentLike } = require("../controllers/commentLike.controller");

/**
 * Endpoints
 */
router
  .route("/:commentId")
  .post(
    userAuth,
    checkCommentMiddleware,
    commentLikeMiddleware,
    toggleCommentLike
  );

module.exports = router;
