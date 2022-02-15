import { Box, Typography } from "@mui/material";
import React from "react";
import { currencyFormat } from "../../helpers/allHelpers";

const Message = props => {
  const { amount } = props.investment;

  return (
    <Box
      minHeight={"30vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
      alignContent="center"
      textAlign="center"
    >
      <Box>
        <Box pb={2}>
          <Typography variant="h5">
            Thank you for investing <b>{currencyFormat(amount)}</b> to this
            Project.
          </Typography>
        </Box>

        <Box pt={2}>
          <Typography variant="subtitle1">
            Your shares can be viewed on your iWeb dashboard.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
