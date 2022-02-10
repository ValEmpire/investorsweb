const stripeNode = require("stripe");

const stripe = stripeNode(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
