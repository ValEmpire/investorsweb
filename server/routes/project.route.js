const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/user.middleware");

const { projectMiddleware } = require("../middlewares/project.middleware");

const { validate } = require("../validators");

const { createProjectSchema } = require("../validators/project.validator");

const {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getProject,
} = require("../controllers/project.controller");

router
  .route("/")
  .get(getAllProject)
  .post(userAuth, validate(createProjectSchema), createProject);

router
  .route("/:projectId")
  .get(getProject)
  .put(
    userAuth,
    validate(createProjectSchema),
    projectMiddleware,
    updateProject
  )
  .delete(userAuth, projectMiddleware, deleteProject);

module.exports = router;
