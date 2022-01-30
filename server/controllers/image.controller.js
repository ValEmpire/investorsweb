const { userRegisterSchema } = require("../validators/user.validator");

const Image = require("../models").image;
const User = require("./models").user;

module.exports = {
  uploadUserImage: async (req, res) => {
    try {
      const { url } = req.validatedBody;

      const newImage = await Image.create({
        url,
      });

      req.user.imageId = newImage.id;

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

  updateUserImage: async (req, res) => {
    try {
      const user = req.userImage;

      const { url } = req.validatedBody;
      if (!user) {
        throw new Error("Image does not exist");
      }

      user.image.url = url;

      await user.save();

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
