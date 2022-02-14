const stripe = require("../stripe");

module.exports = {
  paymentIntent: async (req, res, next) => {
    try {
      const { amount } = req.validatedBody;

      const payment = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: amount,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://example.com/success", // This argument redirects a user after they complete a payment.
        cancel_url: "https://example.com/failure", // This argument redirects a user after they click cancel.
        payment_intent_data: {
          application_fee_amount: 9.87,
          transfer_data: {
            destination: "project.user_id", // this is the owner of the project
          },
        },
      });

      // need to return this to client
      // res.json({client_secret: intent.client_secret});
    } catch (err) {
      console.log(err.message);
    }
  },
};
