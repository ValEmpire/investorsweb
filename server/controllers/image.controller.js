const Image = require("../models").image;

const { generateToken } = require("../helpers");

module.exports = {
  upload: async (req, res) => {
    try {
      const { url } = req.validatedBody;

      const newImage = await Image.create({
        url,
      });

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
};
