const model = require("../models");
const Investment = model.investment;
const Project = model.project;
const Image = model.image;
const User = model.user;
const UserDetail = model.userDetail;

module.exports = {
  createInvestment: async (req, res) => {
    try {
      if (req.investment) {
        throw new Error("You already invest in this project");
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

      const originalAmount = req.project.raisedAmount;

      const newAmount = Number(originalAmount) + Number(amount);

      const originalInvestorCount = req.project.investorCount;

      const newInvestorCount = originalInvestorCount + 1;

      req.project.raisedAmount = newAmount;

      req.project.investorCount = newInvestorCount;

      await req.project.save();

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
              {
                model: User,
                as: "owner",
                attributes: {
                  exclude: ["password"],
                },
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

      const { investmentId } = req.params;

      const investment = await Investment.findOne({
        where: {
          id: investmentId,
        },
        include: [
          {
            model: Project,
            include: [
              {
                model: Image,
                as: "logo",
              },
              {
                model: User,
                as: "owner",
                attributes: {
                  exclude: ["password"],
                },
                include: [
                  {
                    model: Image,
                  },
                  {
                    model: UserDetail,
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.status(200).send({
        success: true,
        investment,
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

      const investment = req.investment;

      if (investment) isFound = true;

      return res.status(200).send({
        success: true,
        isFound,
        investment,
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
