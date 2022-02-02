const Project = require("../models").project;

module.exports = {
  projectMiddleware: async (req, res, next) => {
    try {
      const { projectId } = req.params;

      // check if project exists
      const project = await Project.findOne({
        where: {
          id: projectId,
        },
      });

      if (!project) throw new Error("Project does not exists");

      // check if authenticated user is the owner of the project
      if (project.userId !== req.user.id)
        throw new Error("Unauthorized. Project belongs to someone else.");

      req.project = project;

      next();
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  checkProjectMiddleware: async (req, res, next) => {
    try {
      const projectId = req.params.projectId || req.validatedBody.projectId;

      // check if project exists
      const project = await Project.findOne({
        where: {
          id: projectId,
        },
      });

      if (!project) throw new Error("Project does not exists");

      req.project = project;

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
