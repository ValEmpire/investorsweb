import React from "react";
import { Grid } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

function CardSection() {
  return (
    <Grid container justifyContent={"center"}>
      <Grid item md={6}>
        <PaymentElement />
      </Grid>
    </Grid>
  );
}
export default CardSection;
