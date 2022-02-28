const express = require("express");
const router = express.Router();

/**
 * Validators
 */
const { validate } = require("../validators");
const { createProjectSchema } = require("../validators/project.validator");

/**
 * Middlewares
 */
const { userAuth } = require("../middlewares/user.middleware");
const { projectMiddleware } = require("../middlewares/project.middleware");

/**
 * Controllers
 */
const {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
  getAllUserProjects,
  launchProject,
} = require("../controllers/project.controller");

/**
 * Endpoints
 */
router
  .route("/")
  .get(getAllProjects)
  .post(userAuth, validate(createProjectSchema), createProject);

router.route("/user").get(userAuth, getAllUserProjects);

router
  .route("/:projectId/launch")
  .put(userAuth, projectMiddleware, launchProject);

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
