import React from "react";
import CheckoutForm from "./CheckoutForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe";

// redux
import { useSelector } from "react-redux";

const Payment = props => {
  const { clientSecret } = useSelector(state => state.stripe);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default Payment;
