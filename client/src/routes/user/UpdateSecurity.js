import React, { useState } from "react";
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

// Redux
import { useDispatch } from "react-redux";
import { updateUserSecurity } from "../../redux/actions/user.action";

const UpdateSecurity = props => {
  const dispatch = useDispatch();

  const { open, handleClose, user } = props;

  const [security, setSecurity] = useState(user);

  const handleForm = e => {
    setSecurity({
      ...security,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = event => {
    dispatch(updateUserSecurity(security));

    handleClose();
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
                    value={security.firstName}
                    name="firstName"
                    label="First Name"
                    id="firstName"
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    onChange={e => handleForm(e)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={security.lastName}
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    onChange={e => handleForm(e)}
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
                      {user.password && (
                        <TextField
                          margin="normal"
                          required
                          value={security.currentPassword || ""}
                          fullWidth
                          name="currentPassword"
                          label="Current Password"
                          id="currentPassword"
                          type="password"
                          onChange={e => handleForm(e)}
                        />
                      )}

                      <TextField
                        margin="normal"
                        required
                        value={security.cPassword || ""}
                        fullWidth
                        name="cPassword"
                        label="Password"
                        id="cPassword"
                        type="password"
                        onChange={e => handleForm(e)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={security.repeatPassword || ""}
                        name="repeatPassword"
                        label="Repeat Password"
                        id="repeatPassword"
                        type="password"
                        onChange={e => handleForm(e)}
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
