const model = require("../models");
const Comment = model.comment;

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
};
