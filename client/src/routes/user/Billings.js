import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";

// redux
import { useDispatch, useSelector } from "react-redux";
import { createAccount, getAllCards } from "../../redux/actions/stripe.action";

const DebitCard = props => {
  const { card } = props;

  return (
    <Box mb={3} pt={2}>
      <Grid container justifyContent={"center"}>
        <Grid item md={6} sm={7} xs={12}>
          <Paper variant="outlined">
            <Box m={2}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box pt={card.brand === "Visa" ? 1 : 0}>
                    <CardMedia
                      component="img"
                      image={
                        card.brand === "Visa"
                          ? "/images/visa.png"
                          : "/images/mastercard.png"
                      }
                      alt="debit card logo"
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Typography variant="h5">{card.brand}</Typography>
                    <Typography variant="h6">• • • • {card.last4}</Typography>
                    <Typography variant="subtitle2">
                      Expires: {card.exp_month}/{card.exp_year}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider />
            <Box display="flex" justifyContent={"space-between"} p={2}>
              <Typography variant="subtitle1" fontWeight={700}>
                {card.default_for_currency && "Primary"}
              </Typography>
              <Button size="small" variant="text">
                Remove
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const Billings = props => {
  const dispatch = useDispatch();

  const { user } = props;

  const { cards } = useSelector(state => state.stripe);

  const [loading, setLoading] = useState(true);

  const setUpStripe = useCallback(async () => {
    await createAccount(user.stripeId);

    await dispatch(getAllCards(user.stripeId));

    setLoading(false);

    return;
  }, [dispatch, user.stripeId]);

  useEffect(() => {
    setUpStripe();
  }, [setUpStripe]);

  return (
    <Box>
      {loading && <Loading />}

      {!loading && cards.map(card => <DebitCard key={card.id} card={card} />)}
    </Box>
  );
};

export default Billings;
