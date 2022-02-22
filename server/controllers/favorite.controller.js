const model = require("../models");
const Favorite = model.favorite;
const Project = model.project;
const Image = model.image;

module.exports = {
  toggleFavoriteProject: async (req, res) => {
    try {
      const { id } = req.project;

      if (req.favorite) {
        await req.favorite.destroy();
      } else {
        await Favorite.create({
          projectId: req.params.projectId,
          userId: req.user.id,
        });
      }
      return res.status(200).send({
        success: true,
        projectId: id,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getAllFavoriteProjects: async (req, res) => {
    try {
      const favoriteProjects = await Favorite.findAll({
        where: {
          userId: req.user.id,
        },

        include: [
          {
            model: Project,
            include: {
              model: Image,
              as: "logo",
            },
          },
        ],
      });

      return res.status(200).send({
        success: true,
        favoriteProjects,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getFavoriteProject: async (req, res) => {
    try {
      let isFavorite = true;

      if (!req.favorite) isFavorite = false;

      return res.status(200).send({
        success: true,
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
};
