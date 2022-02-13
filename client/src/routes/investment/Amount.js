import React from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { currencyFormat } from "../../helpers/amountReducer";
import NumberFormat from "react-number-format";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setInvestmentAmount } from "../../redux/actions/investment.action";

export default function Amount(props) {
  const dispatch = useDispatch();

  const { amount } = useSelector(state => state.investment);

  const { project, handleStep, i } = props;

  const handleAmount = e => {
    dispatch(setInvestmentAmount(e));
  };

  const error = () => {
    if (!amount) return false;

    if (Number(amount) >= project.minInvestment) return false;

    return true;
  };

  return (
    <Box>
      <NumberFormat
        customInput={TextField}
        onValueChange={values => handleAmount(values.value)}
        value={amount}
        variant="outlined"
        fullWidth
        decimalScale={2}
        thousandSeparator=","
        fixedDecimalScale
        prefix="$ "
      />
      {/* <TextField
        label="Amount"
        variant="outlined"
        autoFocus
        fullWidth
        value={amount}
        onChange={e => handleAmount(e)}
      /> */}

      <FormHelperText error={error()}>
        The minimum investment in this offering is{" "}
        <b>{currencyFormat(project.minInvestment)}</b>.
      </FormHelperText>

      <Box mt={1} pt={2} pb={2} mb={1} textAlign={"center"}>
        <Button
          variant="contained"
          onClick={() => handleStep(i + 1)}
          disabled={!amount ? true : error()}
        >
          Continue
        </Button>
      </Box>
      <Divider />
    </Box>
  );
}
