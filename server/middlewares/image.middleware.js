const Image = require("../models").images;
const User = require("./models").user;

module.exports = {
  userImageMiddleware: async (req, res, next) => {
    try {
      const userImage = User.findOne({
        where: {
          id: req.user.id,
        },

        include: [
          {
            model: Image,
            required: true,
          },
        ],
      });

      req.userImage = userImage;

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
