const model = require("../models");
const Investment = model.investment;
const Project = model.project;
const Image = model.image;

module.exports = {
  investmentMiddleware: async (req, res, next) => {
    try {
      const user = req.user;

      const { projectId } = req.validatedBody;

      const investment = await Investment.findOne({
        where: {
          projectId,
          userId: user.id,
        },
      });

      req.investment = investment;

      next();
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  checkInvestmentMiddleware: async (req, res, next) => {
    try {
      const investment = await Investment.findOne({
        where: {
          id: req.params.investmentId,
          userId: req.user.id,
        },
        include: [
          {
            model: Project,
            include: [
              {
                model: Image,
                as: "logo",
              },
            ],
          },
        ],
      });

      req.investment = investment;

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
