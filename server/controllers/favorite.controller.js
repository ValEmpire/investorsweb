const model = require("../models");
const Favorite = model.favorite;

module.exports = {
  toggleFavorite: async (req, res) => {
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
};
