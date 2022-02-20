import React from "react";
import {
  Avatar,
  Box,
  Card,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  Popper,
  Typography,
} from "@mui/material";

const NotificationPopper = props => {
  const { anchorElNotification, clickAwayHandler } = props;

  return (
    <Popper
      open={Boolean(anchorElNotification)}
      anchorEl={anchorElNotification}
      placement={"bottom-end"}
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={clickAwayHandler}>
          <Fade {...TransitionProps} timeout={100}>
            <Card component={Box} mt={1} width={"360px"} square>
              <Box>
                <Box pl={2} pt={2} pb={1}>
                  <Typography fontWeight={700} variant="h6">
                    Notifications
                  </Typography>
                </Box>
                <Divider />
                <Box className="popper" m={1}>
                  <Grid container sx={{ p: 1 }}>
                    <Grid item xs={2}>
                      <Avatar alt="Person" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography noWrap variant="body1">
                        A very long content of popper. And it will hello world.
                        A very long content of popper. And it will hello world.
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        1 Minute ago
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="popper" m={1}>
                  <Grid container sx={{ p: 1 }}>
                    <Grid item xs={2}>
                      <Avatar alt="Person" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography noWrap variant="body1">
                        The content of the Popper.
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        1 Minute ago
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default NotificationPopper;
