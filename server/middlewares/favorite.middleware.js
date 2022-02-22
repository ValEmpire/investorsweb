const Favorite = require("../models").favorite;

module.exports = {
  favoriteMiddleware: async (req, res, next) => {
    try {
      const user = req.user;

      const { projectId } = req.params;

      const favorite = await Favorite.findOne({
        where: {
          projectId,
          userId: user.id,
        },
      });

      req.favorite = favorite;

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
