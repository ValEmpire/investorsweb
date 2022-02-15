const model = require("../models");
const Message = model.message;
const User = model.user;
const Image = model.image;

module.exports = {
  createMessage: async (req, res) => {
    try {
      const user = req.user;
      const { conversationId } = req.params;
      const { body } = req.validatedBody;

      const newMessage = await Message.create({
        userId: user.id,
        conversationId: conversationId,
        body: body,
      });

      return res.status(200).send({
        success: true,
        newMessage,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateMessage: async (req, res) => {
    try {
      const message = req.message;

      if (!message) throw new Error("Message does'nt exit");

      message.body = req.validatedBody.body;

      await message.save();

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

  deleteMessage: async (req, res) => {
    try {
      const message = req.message;

      if (!message) throw new Error("Message does'nt exit");

      await message.destroy();

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

  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.findAll({
        where: {
          userId: req.user.id,
        },
        include: [
          {
            model: User,
            include: [
              {
                model: Image,
              },
            ],
          },
        ],
      });
      return res.status(200).send({
        success: true,
        messages,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getMessages: async (req, res) => {
    try {
      if (!req.message) {
        throw new Error("Message does'nt exist");
      }
      return res.status(200).send({
        success: true,
        message: req.message,
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
