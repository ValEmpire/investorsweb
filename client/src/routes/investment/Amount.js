import React, { useEffect, useCallback } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { currencyFormat } from "../../helpers/allHelpers";

import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import NumberFormat from "react-number-format";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setInvestmentAmount,
  setPaymentMethod,
} from "../../redux/actions/investment.action";

import { getAllCards } from "../../redux/actions/stripe.action";

export default function Amount(props) {
  const dispatch = useDispatch();

  const { amount, paymentMethod } = useSelector(state => state.investment);

  const { cards } = useSelector(state => state.stripe);

  const user = useSelector(state => state.user);

  const { project, handleStep, i } = props;

  const handleAmount = e => {
    dispatch(setInvestmentAmount(e));
  };

  const handlePaymentMethod = e => {
    const method = e.target.value;

    dispatch(setPaymentMethod(method));
  };

  const error = () => {
    if (!amount) return false;

    if (Number(amount) >= project.minInvestment) return false;

    return true;
  };

  const handleCards = useCallback(() => {
    dispatch(
      getAllCards(user.customerId, () => {
        return;
      })
    );

    return;
  }, [dispatch, user.customerId]);

  useEffect(() => {
    handleCards();
  }, [handleCards]);

  return (
    <Box>
      <Box pb={2} mb={2}>
        <Box pb={1}>
          <Typography variant="body2">Amount</Typography>
        </Box>
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

        <FormHelperText error={error()}>
          The minimum investment in this offering is{" "}
          <b>{currencyFormat(project.minInvestment)}</b>.
        </FormHelperText>
      </Box>

      <Box pb={2}>
        <Box pb={1}>
          <Typography variant="body2">Payment Method</Typography>
        </Box>
        <FormControl fullWidth>
          <Select value={paymentMethod} onChange={e => handlePaymentMethod(e)}>
            {cards.map((card, i) => (
              <MenuItem key={card.id + i} value={card.id}>
                {
                  <span className="capitalize">
                    {card.brand} •••• {card.last4}
                  </span>
                }
              </MenuItem>
            ))}

            <MenuItem value={false}>Setup new card</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
