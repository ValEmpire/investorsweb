import React, { useCallback, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import Loading from "../../components/Loading";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  generateLink,
  getAccount,
} from "../../redux/actions/stripe.action";

const Field = props => {
  const { name, value } = props;

  return (
    <Box
      pb={2}
      display={"flex"}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="subtitle1">{name}:</Typography>
      <Typography
        variant="body1"
        fontWeight={700}
        noWrap
        className={name !== "Email" ? "capitalize" : null}
      >
        {value}
      </Typography>
    </Box>
  );
};

const ConnectedAccount = props => {
  const dispatch = useDispatch();

  const { account } = props;

  const {
    payouts_enabled,
    business_profile,
    email,
    country,
    default_currency,
    external_accounts,
  } = account;

  const { user } = props;

  const [loading, setLoading] = useState(true);

  const setupAccount = useCallback(async () => {
    // this will create an account if user has no accountId
    await dispatch(createAccount(user.accountId));

    await dispatch(getAccount());

    await dispatch(generateLink(payouts_enabled));

    setLoading(false);

    return;
  }, [dispatch, user.accountId, payouts_enabled]);

  useEffect(() => {
    setupAccount();
  }, [dispatch, setupAccount]);

  const accountInfos = [
    {
      name: "Business Name",
      value: business_profile ? business_profile.name : "",
    },
    {
      name: "Country",
      value: country,
    },
    {
      name: "Default Currency",
      value: default_currency,
    },
    {
      name: "Email",
      value: email,
    },
  ];

  return (
    <Box>
      {loading && <Loading />}

      {!loading && !payouts_enabled && (
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            There is no company account associated with your iWeb account.
          </Typography>
        </Box>
      )}

      {!loading && payouts_enabled && (
        <Box>
          <Box pt={2} pb={2}>
            <Typography variant="h6" fontWeight={700}>
              Company Profile
            </Typography>
          </Box>

          {/* Profile */}
          <Box>
            {accountInfos.map((info, i) => (
              <Field key={info.name + i} {...info} />
            ))}
          </Box>

          {/* Bank Account */}
          <Box pt={2} pb={2}>
            <Typography variant="h6" fontWeight={700}>
              Bank Account
            </Typography>
          </Box>
          <Box
            pb={2}
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Bank Account:</Typography>
            <Typography variant="body1" fontWeight={700} noWrap>
              {external_accounts.data[0].bank_name}
            </Typography>
          </Box>
          <Box
            pb={2}
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Account Number:</Typography>
            <Typography variant="body1" fontWeight={700} noWrap>
              ••••{external_accounts.data[0].last4}
            </Typography>
          </Box>
          <Box
            pb={2}
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Routing Number:</Typography>
            <Typography variant="body1" fontWeight={700} noWrap>
              {external_accounts.data[0].routing_number}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ConnectedAccount;
