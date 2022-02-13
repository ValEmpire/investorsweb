import React, { useState } from "react";
import { TextField } from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";
import { currencyFormat } from "../../helpers/allHelpers";

export default function Amount(props) {
  const { amount, handleAmount, project } = props;

  return (
    <>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          type="number"
          required
          id="amount"
          name="amount"
          label="Amount"
          value={amount}
          fullWidth
          onChange={e => handleAmount(e)}
        />

        <FormHelperText id="filled-weight-helper-text">
          Your investment amount will be rounded up to be a multiple of the
          share price. The minimum investment in this offering is{" "}
          <b>{currencyFormat(Number(project.minInvestment))}</b>.
        </FormHelperText>
      </FormControl>
    </>
  );
}
