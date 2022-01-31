const model = require("../models");
const Project = model.project;
const User = model.project;
const Image = model.image;
const Favorite = model.favorite;

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

  getAllProject: async (req, res) => {
    try {
      const projects = await Project.findAll();

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
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Image,
          },
          {
            model: Favorite,
            include: [
              {
                model: User,
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
};