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

      let cards = [];

      let primaryCard = {};

      for (const card of account.data) {
        if (card.default_for_currency) {
          primaryCard = card;
        } else {
          cards.push(card);
        }
      }

      return res.status(200).send({
        success: true,
        cards,
        primaryCard,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  addCard: async (req, res) => {
    try {
      const { stripeId } = req.user;

      const { number, expiry, cvc, name } = req.body;

      const exp_month = expiry.substring(0, 2);

      const exp_year = expiry.substring(2, 4);

      const token = await stripe.tokens.create({
        card: {
          number,
          exp_month,
          exp_year,
          cvc,
          name,
          currency: "CAD",
        },
      });

      const card = await stripe.accounts.createExternalAccount(stripeId, {
        external_account: token.id,
      });

      return res.status(200).send({
        success: true,
        card,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  deleteCard: async (req, res, next) => {
    try {
      const { stripeId } = req.user;

      const { cardId } = req.body;

      await stripe.accounts.deleteExternalAccount(stripeId, cardId);

      next();
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  updateCard: async (req, res, next) => {
    try {
      const { stripeId } = req.user;

      const { cardId } = req.body;

      await stripe.accounts.updateExternalAccount(stripeId, cardId, {
        default_for_currency: true,
      });

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
