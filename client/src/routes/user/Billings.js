import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import { createAccount } from "../../redux/actions/stripe.action";

const Billings = props => {
  const { user } = props;

  useEffect(() => {
    createAccount(user.stripeId);
  }, [user.stripeId]);

  return (
    <Box>
      {!user.stripeId && <Typography>You do not have an account.</Typography>}
    </Box>
  );
};

export default Billings;
