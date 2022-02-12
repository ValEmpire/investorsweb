import React from "react";
import { Box, Button, Divider, InputAdornment, TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { currencyFormat } from "../../helpers/amountReducer";

export default function Amount(props) {
  const { amount, handleAmount, project, handleStep, i } = props;

  const error = Number(amount) < project.minInvestment;

  return (
    <>
      <TextField
        error={!amount ? false : error}
        id="amount"
        name="amount"
        fullWidth
        autoFocus
        label="Amount"
        onChange={e => handleAmount(e)}
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          value: amount,
        }}
      />

      <FormHelperText error={!amount ? false : error}>
        The minimum investment in this offering is{" "}
        <b>{currencyFormat(project.minInvestment)}</b>.
      </FormHelperText>

      <Box mt={1} pt={2} pb={2} mb={1} textAlign={"center"}>
        <Button
          disabled={error}
          variant="contained"
          onClick={() => handleStep(i + 1)}
        >
          Continue
        </Button>
      </Box>
      <Divider />
    </>
  );
}
