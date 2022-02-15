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
  getAllProjects,
  getProject,
  getAllUserProjects,
  getAllProjectsInProgress,
  getAllProjectsCompleted,
} = require("../controllers/project.controller");

router
  .route("/")
  .get(getAllProjects)
  .post(userAuth, validate(createProjectSchema), createProject);

router.route("/user").get(userAuth, getAllUserProjects);
router.route("/inProgress").get(getAllProjectsInProgress);
router.route("/completed").get(getAllProjectsCompleted);

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
