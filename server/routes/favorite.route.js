const express = require("express");
const router = express.Router();

//MIDDLEWARES
const { userAuth } = require("../middlewares/user.middleware");
const { checkProjectMiddleware } = require("../middlewares/project.middleware");
const { favoriteMiddleware } = require("../middlewares/favorite.middleware");
//CONTROLLERS
const { toggleFavorite } = require("../controllers/favorite.controller");
//ROUTES
router
  .route("/:projectId")
  .post(userAuth, checkProjectMiddleware, favoriteMiddleware, toggleFavorite);

module.exports = router;
