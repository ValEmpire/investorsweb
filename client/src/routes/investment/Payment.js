import React from "react";
import CheckoutForm from "./CheckoutForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe";

// redux
import { useSelector } from "react-redux";
import { Box, Divider } from "@mui/material";

const Payment = props => {
  const { user, i, handleStep } = props;

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
    <Box>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm handleStep={handleStep} i={i} user={user} />
      </Elements>
      <Divider />
    </Box>
  );
};

export default Payment;
