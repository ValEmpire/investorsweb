const Image = require("../models").image;
const User = require("../models").user;
const Project = require("../models").project;

module.exports = {
  /**
   * This will check if user has already an image associated to his User model
   * @returns err if found
   * @returns create userImage property inside req object and put userImage as a value then go next to other route
   */
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

  /**
   * This will check if project has already an image associated to his Project model
   * @returns err if found
   * @returns create projectImage property inside req object and put projectImage as a value then go next to other route
   */
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
