import React from "react";
import CheckoutForm from "./CheckoutForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe";

// redux
import { useSelector } from "react-redux";

const Payment = props => {
  const { clientSecret } = useSelector(state => state.stripe);

  const options = {
    // passing the client secret obtained in step 2
    clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm user={props.user} />
    </Elements>
  );
};

export default Payment;
