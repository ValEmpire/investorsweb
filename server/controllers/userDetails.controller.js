const model = require("../models");
const UserDetail = model.userDetail;

module.exports = {
  createUserDetail: async (req, res) => {
    try {
      if (req.userDetail) throw new Error("User details already exists.");

      const { headline, city, province, phoneNumber } = req.validatedBody;

      const user = req.user;

      await UserDetail.create({
        userId: user.id,
        headline,
        city,
        province,
        phoneNumber,
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

  updateUserDetail: async (req, res) => {
    try {
      const userDetail = req.userDetail;

      // if no userDetail Create new one
      if (!userDetail) {
        const { headline, city, province, phoneNumber } = req.validatedBody;

        const newUserDetail = await UserDetail.create({
          userId: req.user.id,
          headline,
          city,
          province,
          phoneNumber,
        });

        return res.status(200).send({
          success: true,
          userDetail: newUserDetail,
        });
      }

      // if userDetail exists, update it
      for (const detail in req.validatedBody) {
        userDetail[detail] = req.validatedBody[detail];
      }

      await userDetail.save();

      return res.status(200).send({
        success: true,
        userDetail,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  deleteUserDetail: async (req, res) => {
    try {
      const userDetail = req.userDetail;

      if (!userDetail) throw new Error("User details does not exists");

      await userDetail.destroy();

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
