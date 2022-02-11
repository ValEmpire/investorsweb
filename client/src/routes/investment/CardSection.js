/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

function CardSection() {
  return (
    <label>
      Card details
      <PaymentElement />
    </label>
  );
}
export default CardSection;
