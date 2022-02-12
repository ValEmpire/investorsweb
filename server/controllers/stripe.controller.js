const stripe = require("../stripe");

module.exports = {
  getAllCards: async (req, res) => {
    try {
      const { customerId } = req.user;

      const account = await stripe.customers.listPaymentMethods(customerId, {
        type: "card",
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

  addCard: async (req, res) => {
    try {
      const { customerId } = req.user;

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

      const card = await stripe.customers.createSource(customerId, {
        source: token.id,
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
      const { cardId } = req.body;

      await stripe.paymentMethods.detach(cardId);

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
      const { customerId } = req.user;

      const { cardId } = req.body;

      await await stripe.customers.updateSource(customerId, cardId, {
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

  createPaymentIntent: async (req, res) => {
    try {
      const { customerId } = req.user;

      const { amount, projectOwner } = req.body;

      console.log(projectOwner);

      const intent = await stripe.paymentIntents.create({
        customer: customerId,
        setup_future_usage: "off_session",
        amount,
        currency: "CAD",
        automatic_payment_methods: {
          enabled: true,
        },
        application_fee_amount: 0,
        transfer_data: {
          destination: projectOwner,
        },
      });

      return res.status(200).send({
        success: true,
        clientSecret: intent.client_secret,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getLink: async (req, res) => {
    try {
      const { accountId } = req.user;

      if (!accountId)
        throw new Error("Cannot create link. User has no account id.");

      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: "http://localhost:3000/user",
        return_url: "http://localhost:3000/user",
        type: "account_onboarding",
      });

      return res.status(200).send({
        success: true,
        link: accountLink.url,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  getAccount: async (req, res) => {
    try {
      const { accountId } = req.user;

      const account = await stripe.accounts.retrieve(accountId);

      return res.status(200).send({
        success: true,
        account,
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
