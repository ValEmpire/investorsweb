const Comment = require("../models").comment;

module.exports = {
  commentMiddleware: async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.commentId,
          userId: req.user.id
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
