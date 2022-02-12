import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { Box, Button, Grid, Paper } from "@mui/material";

export default function CheckoutForm(props) {
  const { firstName, lastName, email } = props.user;
  const { handleStep, i } = props;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,

      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: `${firstName} ${lastName}`,
            email,
          },
        },
        save_payment_method: true,
        return_url: "http://localhost:3000/investment/success",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent={"center"}>
        <Grid item md={8}>
          <Paper component={Box} p={4}>
            <PaymentElement />
          </Paper>
        </Grid>
      </Grid>

      <Box mt={1} pt={2} pb={2} mb={1} display="flex" justifyContent={"center"}>
        <Box m={1} width={110}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleStep(i - 1)}
          >
            Back
          </Button>
        </Box>
        <Box m={1} width={110}>
          <Button variant="contained" fullWidth type="submit">
            Authorize
          </Button>
        </Box>
      </Box>
    </form>
  );
}
