const express = require("express");
const router = express.Router();

/**
 * Middlewares
 */
const { userAuth } = require("../middlewares/user.middleware");
const { checkProjectMiddleware } = require("../middlewares/project.middleware");
const { favoriteMiddleware } = require("../middlewares/favorite.middleware");

/**
 * Controllers
 */
const {
  toggleFavoriteProject,
  getAllFavoriteProjects,
  getFavoriteProject,
} = require("../controllers/favorite.controller");

router.route("/").get(userAuth, getAllFavoriteProjects);

/**
 * Endpoints
 */
router
  .route("/:projectId")
  .get(userAuth, checkProjectMiddleware, favoriteMiddleware, getFavoriteProject)
  .post(
    userAuth,
    checkProjectMiddleware,
    favoriteMiddleware,
    toggleFavoriteProject
  );

module.exports = router;
