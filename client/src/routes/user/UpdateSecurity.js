import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UpdateSecurity = (props) => {
  const { open, handleClose } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log(data);
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
                  <Typography variant="h6">Update Security</Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    id="firstName"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                  />
                  <Box mt={2} />
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Change Password</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="currentPassword"
                        label="Current Password"
                        id="currentPassword"
                        type="password"
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Repeat Password"
                        id="repeatPassword"
                        type="password"
                      />
                    </AccordionDetails>
                  </Accordion>

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

export default UpdateSecurity;
