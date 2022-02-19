const model = require("../models");
const Comment = model.comment;
const User = model.user;
const Image = model.image;

module.exports = {
  createComment: async (req, res) => {
    try {
      const user = req.user;

      const { projectId } = req.params;
      const { body, commentId } = req.validatedBody;

      const newComment = await Comment.create({
        userId: user.id,
        projectId: projectId,
        body: body,
        commentId: commentId,
      });

      return res.status(200).send({
        success: true,
        newComment,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll({
        where: {
          projectId: req.params.projectId,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: Image,
              },
            ],
          },
          {
            model: Comment,
            as: "reply",
            include: [
              {
                model: User,
                attributes: {
                  exclude: ["password"],
                },
                include: [
                  {
                    model: Image,
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).send({
        success: true,
        comments,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  },

  updateComment: async (req, res) => {
    try {
      const comment = req.comment;

      if (!comment) throw new Error("Comment not found");

      comment.body = req.validatedBody.body;

      await comment.save();

      return res.status(200).send({
        success: true,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = req.comment;

      if (!comment) throw new Error("Comment not found");

      await comment.destroy();

      return res.status(200).send({
        success: true,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  },
};
