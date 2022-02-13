const model = require("../models");
const Investment = model.investment;
const Project = model.project;
const Image = model.image;

module.exports = {
  createInvestment: async (req, res) => {
    try {
      if (req.investment) {
        throw new Error("You Alredy Invest In This Project");
      }

      const { amount } = req.validatedBody;

      if (amount < req.project.minInvestment) {
        throw new Error(`Minimum investment ${req.project.minInvestment}`);
      }

      const newInvestment = await Investment.create({
        projectId: req.validatedBody.projectId,
        userId: req.user.id,
        amount,
      });

      return res.status(200).send({
        success: true,
        newInvestment,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateInvestment: async (req, res) => {
    try {
      if (!req.investment) {
        throw new Error("Investment not exist");
      }
      const { amount } = req.validatedBody;

      if (amount < req.project.minInvestment) {
        throw new Error(`Minimum investment ${req.project.minInvestment}`);
      }

      req.investment.amount = amount;

      await req.investment.save();

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  deleteInvestment: async (req, res) => {
    try {
      if (!req.investment) {
        throw new Error("Investment not exist");
      }

      const investment = req.investment;

      await investment.destroy();

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getAllInvestments: async (req, res) => {
    try {
      const investments = await Investment.findAll({
        where: {
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
      return res.status(200).send({
        success: true,
        investments,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getInvestment: async (req, res) => {
    try {
      if (!req.investment) {
        throw new Error("Investment not exist");
      }
      return res.status(200).send({
        success: true,
        investment: req.investment,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  findProjectInvestment: async (req, res) => {
    try {
      let isFound = false;

      if (req.investment) isFound = true;

      return res.status(200).send({
        success: true,
        isFound,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};
