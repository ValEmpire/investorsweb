import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Chat = () => {
  const classes = useStyles();

  return (
    <Box pt={6} pb={6}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={6} sm={8} xs={12}>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4" className="header-message">
                  My Messages
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <div>
                    <Grid item>
                      <Stack direction="row" spacing={2}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Select All"
                        />

                        <Button variant="outlined" size="medium">
                          All Messages
                        </Button>
                      </Stack>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Grid container component={Paper} className={classes.chatSection}>
              <Grid item xs={12}>
                <List className={classes.messageArea}>
                  <ListItem key="1">
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          primary="An investor without investment objectives is like a traveler without a destination."
                        ></ListItemText>

                        <ListItem button key="Alice">
                          <ListItemIcon>
                            <Avatar
                              alt="Alice"
                              src="https://material-ui.com/static/images/avatar/3.jpg"
                            />
                          </ListItemIcon>
                          <ListItemText primary="Alice">Alice</ListItemText>
                          <Grid item xs={12}>
                            <ListItemText
                              align="right"
                              secondary="09:30"
                            ></ListItemText>
                          </Grid>
                        </ListItem>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem key="2">
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          primary="Sometimes your best investments are the ones you don't make."
                        ></ListItemText>
                        <ListItem button key="CindyBaker">
                          <ListItemIcon>
                            <Avatar
                              alt="Cindy"
                              src="https://material-ui.com/static/images/avatar/2.jpg"
                            />
                          </ListItemIcon>
                          <ListItemText primary="Cindy">Cindy</ListItemText>
                          <Grid item xs={12}>
                            <ListItemText
                              align="right"
                              secondary="06:00"
                            ></ListItemText>
                          </Grid>
                        </ListItem>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem key="3">
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          primary="The best investment is in the tools of one's own trade."
                        ></ListItemText>
                        <ListItem button key="Remy">
                          <ListItemIcon>
                            <Avatar
                              alt="Remy"
                              src="https://material-ui.com/static/images/avatar/1.jpg"
                            />
                          </ListItemIcon>
                          <ListItemText primary="Remmy">Remmy</ListItemText>
                          <Grid item xs={12}>
                            <ListItemText
                              align="right"
                              secondary="01:31"
                            ></ListItemText>
                          </Grid>
                        </ListItem>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
