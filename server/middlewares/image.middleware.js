const Image = require("../models").images;

module.exports = {
  imageMiddleware: async (req, res, next) => {
    try {
      const { id } = req.body;

      const image = await Image.findOne({
        where: {
          id,
        },
      });

      req.image = image;

      next();
    } catch (err) {
      console.log(err.message);

      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};
