const stripe = require("../stripe");

module.exports = {
  createInvestorAccount: async (req, res) => {
    try {
      const { email } = req.user;

      if (req.user.accountId)
        throw new Error("User is already registered as investor in stripe");

      const newAccount = await stripe.accounts.create({
        type: "express",
        country: "CA",
        email,
        capabilities: {
          acss_debit_payments: {
            requested: true,
          },
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
          legacy_payments: {
            requested: true,
          },
        },
      });

      const accountId = newAccount.id;

      req.user.accountId = accountId;

      await req.user.save();

      return res.status(200).send({
        success: true,
        accountId,
      });
    } catch (err) {
      console.log(err.message);

      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  createCustomerAccount: async (req, res) => {
    try {
      if (req.user.customerId)
        throw new Error("User is already registered as customer in stripe");

      const { email, firstName, lastName } = req.user;

      const newCustomer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`,
      });

      const customerId = newCustomer.id;

      req.user.customerId = customerId;

      await req.user.save();

      return res.status(200).send({
        success: true,
        customerId,
      });
    } catch (err) {
      return;
    }
  },

  getAllCards: async (req, res) => {
    try {
      const { accountId } = req.user;

      const account = await stripe.accounts.listExternalAccounts(accountId, {
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
      const { accountId } = req.user;

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

      const card = await stripe.accounts.createExternalAccount(accountId, {
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
      const { accountId } = req.user;

      const { cardId } = req.body;

      await stripe.accounts.deleteExternalAccount(accountId, cardId);

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
      const { accountId } = req.user;

      const { cardId } = req.body;

      await stripe.accounts.updateExternalAccount(accountId, cardId, {
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
};
