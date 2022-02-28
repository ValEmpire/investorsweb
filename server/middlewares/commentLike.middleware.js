const CommentLike = require("../models").commentLike;

module.exports = {
  /**
   * This will check if :commentId exists in CommentLike model with user id of who owns the cookie
   * @returns err if found
   * @returns create commentLike property inside req object and put commentLike as a value then go next to other route
   */

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
