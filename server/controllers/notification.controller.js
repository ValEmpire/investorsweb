const model = require("../models");
const Notification = model.notification;
const User = model.user;
const Image = model.image;

module.exports = {
  getAllUserNotifications: async (req, res) => {
    try {
      const notifications = await Notification.findAll({
        where: {
          toUserId: req.user.id,
        },
        include: [
          {
            model: User,
            as: "sender",
            attributes: {
              exclude: ["password", "accountId", "customerId"],
            },
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
        notifications,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateNotification: async (req, res) => {
    try {
      if (!req.notification) {
        throw new Error("Can not fined notification");
      }
      req.notification.isSeen = false;
      await req.notification.save();

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
