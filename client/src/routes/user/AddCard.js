import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Cards from "react-credit-cards";

// Redux
import { useDispatch } from "react-redux";
import { addCard } from "../../redux/actions/stripe.action";

const AddCard = props => {
  const dispatch = useDispatch();

  const { open, handleClose } = props;

  const [card, setCard] = useState({
    focus: "",
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  const handleInputFocus = e => {
    const name = e.target.name;

    setCard({
      ...card,
      focus: name,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(addCard(card));

    handleClose();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "number" && value.length > 16) return;

    setCard({
      ...card,
      [name]: value,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        height={"90vh"}
      >
        <Grid item lg={5} md={6} sm={9} xs={11}>
          <Paper variant="outlined">
            <Box textAlign={"right"}>
              <Button onClick={handleClose}>Close</Button>
            </Box>

            <Grid container justifyContent={"center"}>
              <Grid item md={8} xs={11}>
                <Box textAlign={"center"} pb={3}>
                  <Typography variant="h6">Add Card</Typography>
                </Box>

                <Box pb={2} mb={1}>
                  <Cards
                    cvc={card.cvc}
                    expiry={card.expiry}
                    focused={card.focus}
                    name={card.name}
                    number={card.number}
                    placeholders={{
                      name: "Card Holder's Name",
                    }}
                  />
                </Box>

                <Box
                  component="form"
                  noValidate
                  onSubmit={e => handleSubmit(e)}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    id="number"
                    value={card.number || ""}
                    inputProps={{ type: "number" }}
                    name="number"
                    label="Credit Card Number"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="expiry"
                    name="expiry"
                    label="Expiration Date"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="cvc"
                    name="cvc"
                    label="CVC"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 4 }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddCard;
