const model = require("../models");
const CommentLike = model.commentLike;

module.exports = {
  toggleCommentLike: async (req, res) => {
    try {
      if(!req.comment) {
        throw new Error("Comment does not exist")
      }
      if (req.commentLike) {
        await req.commentLike.destroy();
      } else {
        await CommentLike.create({
          commentId: req.params.commentId,
          userId: req.user.id,
        });
      }
      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};