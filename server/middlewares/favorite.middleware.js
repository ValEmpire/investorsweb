const Favorite = require("../models").favorite;

module.exports = {
  /**
   * This will check if :projectId exists in Favorite model with user id of who owns the cookie
   * @returns err if found
   * @returns create favorite property inside req object and put favorite as a value then go next to other route
   */
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
