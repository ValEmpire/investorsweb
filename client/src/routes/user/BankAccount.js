import React, { useCallback, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import Loading from "../../components/Loading";

// Redux
import { useDispatch } from "react-redux";
import { createAccount, generateLink } from "../../redux/actions/stripe.action";

const ConnectedAccount = props => {
  const dispatch = useDispatch();

  const { user } = props;

  const [loading, setLoading] = useState(true);

  const setupAccount = useCallback(async () => {
    // this will create an account if user has no accountId
    await dispatch(createAccount(user.accountId));

    await dispatch(generateLink(false));

    setLoading(false);

    return;
  }, [dispatch, user.accountId]);

  useEffect(() => {
    setupAccount();
  }, [dispatch, setupAccount]);

  return (
    <Box>
      {loading && <Loading />}

      <Box>
        <Typography variant="subtitle1" fontWeight={700}>
          There is no bank account associated with your iWeb account.
        </Typography>
      </Box>
    </Box>
  );
};

export default ConnectedAccount;
