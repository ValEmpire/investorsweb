const UserDetail = require("../models").userDetail;

module.exports = {
  userDetailMiddleware: async (req, res, next) => {
    try {
      const user = req.user;

      const userDetail = await UserDetail.findOne({
        where: {
          userId: user.id,
        },
      });

      req.userDetail = userDetail;

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
