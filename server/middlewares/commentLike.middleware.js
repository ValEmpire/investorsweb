const CommentLike = require("../models").commentLike;

module.exports = {
  commentLikeMiddleware: async (req, res, next) => {
    try {
      const user = req.user;

      const { commentId } = req.params;

      const commentLike = await CommentLike.findOne({
        where: {
          commentId,
          userId: user.id,
        },
      });

      req.commentLike = commentLike;
      console.log(req.commentLike);
      next();
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};