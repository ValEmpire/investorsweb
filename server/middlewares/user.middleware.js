const User = require("../models").user;

module.exports = {
  userMiddleware: async (req, res, next) => {
    try {
      const { email } = req.validatedBody;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      req.user = user;

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
