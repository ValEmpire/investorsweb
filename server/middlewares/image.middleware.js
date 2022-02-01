const Image = require("../models").image;
const User = require("../models").user;
const Project = require("../models").project;

module.exports = {
  userImageMiddleware: async (req, res, next) => {
    try {
      const userImage = await User.findOne({
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

  projectImageMiddleware: async (req, res, next) => {
    try {
      const projectImage = await Project.findOne({
        where: {
          id: req.validatedBody.projectId,
          userId: req.user.id,
        },

        include: [
          {
            model: Image,
            as: "logo",
          },
        ],
      });

      req.projectImage = projectImage;

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
