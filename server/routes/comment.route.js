const express = require("express");
const router = express.Router();

const { validate } = require("../validators");
const { createCommentSchema } = require("../validators/comment.validator");

const { userAuth } = require("../middlewares/user.middleware");
const { checkProjectMiddleware } = require("../middlewares/project.middleware");
const { commentMiddleware } = require("../middlewares/comment.middleware");

const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

router
  .route("/:projectId")
  .get(checkProjectMiddleware, getAllComments)
  .post(
    userAuth,
    validate(createCommentSchema),
    checkProjectMiddleware,
    createComment
  );

router
  .route("/:commentId")
  .put(
    userAuth,
    validate(createCommentSchema),
    checkProjectMiddleware,
    commentMiddleware,
    updateComment
  )
  .delete(userAuth, commentMiddleware, deleteComment);

module.exports = router;
