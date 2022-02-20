const model = require("../models");
const Project = model.project;
const User = model.user;
const Image = model.image;
const Favorite = model.favorite;
const { Op } = require("sequelize");

module.exports = {
  createProject: async (req, res) => {
    try {
      const {
        name,
        location,
        targetFund,
        story,
        website,
        industry,
        deadline,
        minInvestment,
      } = req.validatedBody;

      const newProject = await Project.create({
        name,
        location,
        targetFund,
        story,
        website,
        industry,
        deadline,
        minInvestment,
        userId: req.user.id,
      });

      return res.status(200).send({
        success: true,
        project: newProject,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateProject: async (req, res) => {
    try {
      const project = req.project;

      for (const prop in req.validatedBody) {
        project[prop] = req.validatedBody[prop];
      }

      await project.save();

      return res.status(200).send({
        success: true,
        project,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const project = req.project;

      await project.destroy();

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

  getAllProjects: async (req, res) => {
    try {
      let where = {
        isLive: true,
      };

      if (req.query.progress === "InProgress") {
        where.deadline = {
          [Op.gte]: new Date(),
        };
      } else {
        where.deadline = {
          [Op.lt]: new Date(),
        };
      }

      if (req.query.industry === "Art") {
        where.industry = {
          [Op.like]: "Art",
        };
      } else if (req.query.industry === "Design") {
        where.industry = {
          [Op.like]: "Design",
        };
      } else if (req.query.industry === "Technology") {
        where.industry = {
          [Op.like]: "Technology",
        };
      } else {
      }

      const order = [];
      if (req.query.sort === "LeastFunded") {
        order.push([model.sequelize.col("raisedAmount"), "ASC"]);
      } else if (req.query.sort === "MostFunded") {
        order.push([model.sequelize.col("raisedAmount"), "DESC"]);
      } else if (req.query.sort === "RecentlyLaunched") {
        order.push([model.sequelize.col("createdAt"), "ASC"]);
      } else if (req.query.sort === "ClosingSoon") {
        order.push([model.sequelize.col("deadline"), "ASC"]);
      }

      const projects = await Project.findAll({
        where,
        order,
        include: [
          {
            model: Image,
            as: "logo",
          },
        ],
      });

      return res.status(200).send({
        success: true,
        projects,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getProject: async (req, res) => {
    try {
      const { projectId } = req.params;

      const project = await Project.findOne({
        where: {
          id: projectId,
        },
        include: [
          {
            model: User,
            as: "owner",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Image,
            as: "logo",
          },
          {
            model: Favorite,
            include: [
              {
                model: User,
                required: true,
                attributes: {
                  exclude: ["password"],
                },
              },
            ],
          },
        ],
      });

      let isFavorite = false;

      if (project && project.favorites.length > 0) {
        isFavorite = true;
      }

      return res.status(200).send({
        success: true,
        project,
        isFavorite,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getAllUserProjects: async (req, res) => {
    try {
      const userProjects = await Project.findAll({
        where: {
          userId: req.user.id,
        },

        include: [
          {
            model: Image,
            as: "logo",
          },
        ],
      });

      return res.status(200).send({
        success: true,
        userProjects,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.mssage,
      });
    }
  },

  launchProject: async (req, res) => {
    try {
      const {
        name,
        location,
        targetFund,
        story,
        website,
        imageId,
        industry,
        deadline,
        minInvestment,
      } = req.project;

      const completedField = {
        name,
        location,
        targetFund,
        story,
        website,
        imageId,
        industry,
        deadline,
        minInvestment,
      };

      for (const key in completedField) {
        if (!completedField[key])
          throw new Error(`Cannot launch a project. Missing ${key}`);
      }

      req.project.isLive = true;

      await req.project.save();

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
};
