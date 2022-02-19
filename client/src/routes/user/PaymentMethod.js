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
import { getAllCards, deleteCard } from "../../redux/actions/stripe.action";

const Card = props => {
  const { card, handleDeleteCard, id } = props;

  const { brand, last4, exp_month, exp_year } = card;

  return (
    <Box mb={3} pt={2}>
      <Grid container justifyContent={"center"}>
        <Grid item md={12} xs={12}>
          <Paper variant="outlined" sx={{ borderRadius: 3 }}>
            <Box m={2}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box pt={brand.toLowerCase() === "visa" ? 1 : 0}>
                    <CardMedia
                      component="img"
                      image={
                        brand.toLowerCase() === "visa"
                          ? "/images/visa.png"
                          : "/images/mastercard.png"
                      }
                      alt="debit card logo"
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Typography className="capitalize" variant="h5">
                      {brand}
                    </Typography>
                    <Typography variant="h6">• • • • {last4}</Typography>
                    <Typography variant="subtitle2">
                      Expires: {exp_month}/{exp_year}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider />
            <Box textAlign={"right"} p={2}>
              <Button
                size="small"
                variant="text"
                onClick={() => handleDeleteCard(id)}
              >
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

  const setUpStripe = useCallback(() => {
    // pass user.customerId
    dispatch(
      getAllCards(user.customerId, (err, success) => {
        if (success) {
          setLoading(false);
        }

        return;
      })
    );

    return;
  }, [dispatch, user.customerId]);

  useEffect(() => {
    setUpStripe();
  }, [setUpStripe]);

  const handleDeleteCard = async id => {
    try {
      setLoading(true);

      await dispatch(deleteCard(id));

      setLoading(false);
    } catch (err) {
      //handle error here
    }
  };

  return (
    <Box>
      {loading && <Loading />}

      {!loading && cards.length === 0 && (
        <Typography variant="subtitle1" fontWeight={700}>
          There is no credit/debit cards associated with your iWeb account.
        </Typography>
      )}
      {!loading && cards.length > 0 && (
        <Grid container spacing={4}>
          {/* Backup Card */}

          {cards.map((card, i) => (
            <Grid key={card.fingerprint + i} item xs={12} sm={6}>
              <Card
                card={card}
                id={card.id}
                handleDeleteCard={handleDeleteCard}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Billings;
