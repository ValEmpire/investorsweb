const Comment = require("../models").comment;

module.exports = {
  /**
   * This will check if id : commentId exists in Comment model with user id of who owns the cookie
   * @returns err if found
   * @returns create comment property inside req object and put comment as a value then go next to other route
   */
  commentMiddleware: async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.commentId,
          userId: req.user.id,
        },
      });

      req.comment = comment;

      next();
    } catch (err) {
      console.log(err.message);

      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  /**
   * This will check if :commentId exists in Comment model
   * @returns err if found
   * @returns create comment property inside req object and put comment as a value then go next to other route
   */
  checkCommentMiddleware: async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.commentId,
        },
      });

      req.comment = comment;

      next();
    } catch (err) {
      console.log(err.message);

      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};
