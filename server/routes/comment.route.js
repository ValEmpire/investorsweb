const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/user.middleware");

const { validate } = require("../validators");
const{createCommentSchema} =require("../validators/comment.validator");
const {checkProjectMiddleware} = require("../middlewares/project.middleware")
const {createComment}= require("../controllers/comment.controller")

router.route("/:projectId").post(userAuth,validate(createCommentSchema), checkProjectMiddleware, createComment);


module.exports = router;
