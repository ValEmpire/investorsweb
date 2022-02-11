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
import {
  createAccount,
  getAllCards,
  deleteCard,
  updateCard,
} from "../../redux/actions/stripe.action";

const DebitCard = props => {
  const { card, handleDeleteCard, handleUpdateCard } = props;

  return (
    <Box mb={3} pt={2}>
      <Grid container justifyContent={"center"}>
        <Grid item md={12} xs={12}>
          <Paper variant="outlined" sx={{ borderRadius: 3 }}>
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
              {card.default_for_currency && (
                <Typography variant="subtitle1" fontWeight={700}>
                  Primary
                </Typography>
              )}

              {!card.default_for_currency && (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleUpdateCard(card.id)}
                >
                  Make Primary Card
                </Button>
              )}

              {!card.default_for_currency && (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Remove
                </Button>
              )}
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

  const { cards, primaryCard } = useSelector(state => state.stripe);

  console.log(cards);

  const [loading, setLoading] = useState(true);

  const setUpStripe = useCallback(async () => {
    // this will create an account if user has no accountId
    await dispatch(createAccount(user.accountId));

    await dispatch(getAllCards(user.accountId));

    setLoading(false);

    return;
  }, [dispatch, user.accountId]);

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

  const handleUpdateCard = async id => {
    try {
      setLoading(true);

      await dispatch(updateCard(id));

      setLoading(false);
    } catch (err) {
      //handle error here
    }
  };

  return (
    <Box>
      {loading && <Loading />}

      {!loading && !primaryCard.id && (
        <Typography variant="subtitle1">
          Please add a <b>debit card deposit</b>.{" "}
          <b className="color-primary">IWeb</b> will transfer all collected
          investments to this account.
        </Typography>
      )}

      {!loading && primaryCard.id && (
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Primary</Typography>
              <DebitCard
                card={primaryCard}
                handleDeleteCard={handleDeleteCard}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Backup</Typography>
              {cards.length === 0 && (
                <Box mt={1} pt={1}>
                  <Typography variant="subtitle2">
                    You have no backup card.
                  </Typography>
                </Box>
              )}
              {cards.map(card => (
                <DebitCard
                  key={card.id}
                  card={card}
                  handleDeleteCard={handleDeleteCard}
                  handleUpdateCard={handleUpdateCard}
                />
              ))}
            </Grid>
          </Grid>

          <Typography>
            <b className="color-primary">IWeb</b> will transfer all collected
            investments to your primary card.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Billings;
