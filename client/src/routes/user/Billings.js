import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

// redux
import { useDispatch, useSelector } from "react-redux";
import { createAccount, getAllCards } from "../../redux/actions/stripe.action";

const Billings = props => {
  const dispatch = useDispatch();

  const { user } = props;

  const { cards } = useSelector(state => state.stripe);

  useEffect(() => {
    // this is just a validation
    // in case theres an error on stripe create account
    // when user registered in app
    createAccount(user.stripeId);

    dispatch(getAllCards(user.stripeId));
  }, [user.stripeId, dispatch]);

  return (
    <Box>
      {cards.length === 0 && (
        <Typography>You do not have an account.</Typography>
      )}
    </Box>
  );
};

export default Billings;
