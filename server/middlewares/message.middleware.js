const Message = require("../models").message;

module.exports = {
  messageMiddleware: async (req, res, next) => {
    try {
      const user = req.user;

      const { conversationId } = req.validatedBody;

      const message = await message.findOne({
        where: {
          conversationId,
          userId: user.id,
        },
      });

      req.message = message;

      next();
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  checkMessageMiddleware: async (req, res, next) => {
    try {
      const message = await Message.findOne({
        where: {
          id: req.params.messageId,
        },
      });

      req.message = message;

      next();
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};
