import React from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import { Box, Button } from "@mui/material";

export default function CheckoutForm(props) {
  const { firstName, lastName, email } = props.user;

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
        return_url: "http://localhost/order/123/complete",
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
      <CardSection />
      <Box textAlign={"center"} p={2}>
        <Button variant="contained" type="submit" disabled={!stripe}>
          Confirm Investment
        </Button>
      </Box>
    </form>
  );
}
