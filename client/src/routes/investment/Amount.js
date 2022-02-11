import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";
import { currencyFormat } from "../../helpers/amountReducer";

export default function Amount(props) {
  const { amount, handleAmount, project } = props;

  return (
    <>
      <FormControl>
        <TextField
          required
          id="amount"
          name="amount"
          label="Amount"
          onChange={e => handleAmount(e)}
          InputProps={{
            type: "number",
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            value: amount,
          }}
        />

        <FormHelperText id="filled-weight-helper-text">
          Your investment amount will be rounded up to be a multiple of the
          share price. The minimum investment in this offering is{" "}
          <b>{currencyFormat(project.minInvestment)}</b>.
        </FormHelperText>
      </FormControl>
    </>
  );
}
