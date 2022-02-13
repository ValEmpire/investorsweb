import React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../../redux/actions/stripe.action";
import { submitInvestment } from "../../redux/actions/investment.action";

const Summary = props => {
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

export default function Review(props) {
  const dispatch = useDispatch();

  const { amount, paymentMethod } = useSelector(state => state.investment);

  const { firstName, lastName, email } = props.user;

  const { project, handleStep, i } = props;

  const fields = [
    {
      name: "Project Name",
      value: project.name,
    },
    {
      name: "Amount",
      value: amount,
    },
    {
      name: "First Name",
      value: firstName,
    },
    {
      name: "Last Name",
      value: lastName,
    },
    {
      name: "Email",
      value: email,
    },
  ];

  const handleReview = async () => {
    try {
      // if no paymentmethod means user will add new payment method
      // and will get paymentIntent to get secretKey from stripe
      if (!paymentMethod) {
        await dispatch(createPaymentIntent(amount, project.owner.accountId));
      } else {
        await dispatch(
          submitInvestment({
            amount,
            projectId: project.id,
            projectOwner: project.owner.accountId,
            paymentMethod,
          })
        );
      }

      handleStep(i + 1);
    } catch (err) {
      // handle error
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fbfbfb" }} pt={2}>
      <Grid container justifyContent={"center"}>
        <Grid item md={9} xs={12}>
          <Box pb={1} mb={1} textAlign="center">
            <Typography variant="subtitle1" fontWeight="700">
              Investment Review
            </Typography>
          </Box>

          {fields.map((field, i) => (
            <Summary key={field.value + i} {...field} />
          ))}
        </Grid>
      </Grid>
      <Box mt={1} pt={2} pb={2} mb={1} display="flex" justifyContent={"center"}>
        <Box m={1} width={110}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleStep(i - 1)}
          >
            Back
          </Button>
        </Box>
        <Box m={1} width={110}>
          <Button variant="contained" fullWidth onClick={() => handleReview()}>
            Continue
          </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
