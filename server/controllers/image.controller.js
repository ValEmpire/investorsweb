const { userRegisterSchema } = require("../validators/user.validator");

const Image = require("../models").image;

const generateUrl = (userId, fileName) => {
  return `${process.env.STORAGE}user${userId}%2F${fileName}?alt=media`;
};

module.exports = {
  uploadUserImage: async (req, res) => {
    try {
      const { fileName } = req.validatedBody;

      const url = generateUrl(req.user.id, fileName);

      const newImage = await Image.create({
        url,
      });

      req.user.imageId = newImage.id;

      await req.user.save();

      return res.status(200).send({
        success: true,
        url,
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

      await user.image.save();

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

  uploadProjectImage: async (req, res) => {
    try {
      if (!req.projectImage) {
        throw new Error("Project does not Exist");
      }

      const { url } = req.validatedBody;

      const newProjectImage = await Image.create({
        url,
      });

      req.projectImage.imageId = newProjectImage.id;

      await req.projectImage.save();

      return res.status(200).send({
        success: true,
        newProjectImage,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateProjectImage: async (req, res) => {
    try {
      if (!req.projectImage) {
        throw new Error("Project does not Exist");
      }

      const { url } = req.validatedBody;

      req.projectImage.logo.url = url;

      await req.projectImage.logo.save();

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
