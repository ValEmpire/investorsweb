import React from "react";
import CheckoutForm from "./CheckoutForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe";

// redux
import { useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import { currencyFormat } from "../../helpers/allHelpers";

const Payment = props => {
  const { user, i, handleStep, project } = props;

  const { amount } = useSelector(state => state.investment);

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
      <Box mb={2} textAlign="center">
        <Typography variant="h6">
          Amount to be invested: <b>{currencyFormat(amount)}</b>
        </Typography>
      </Box>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          project={project}
          handleStep={handleStep}
          i={i}
          amount={amount}
          user={user}
        />
      </Elements>
      <Divider />
    </Box>
  );
};

export default Payment;
