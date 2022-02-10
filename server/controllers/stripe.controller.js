const stripe = require("../stripe");

module.exports = {
  createConnectedAccount: async (req, res) => {
    try {
      const { email } = req.user;

      const newAccount = await stripe.accounts.create({
        type: "express",
        country: "CA",
        email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      const { id } = newAccount;

      req.user.stripeId = id;

      await req.user.save();

      return res.status(200).send({
        success: true,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getAllCards: async (req, res) => {
    try {
      const { stripeId } = req.user;

      const account = await stripe.accounts.listExternalAccounts(stripeId, {
        object: "card",
      });

      return res.status(200).send({
        success: true,
        cards: account.data,
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
