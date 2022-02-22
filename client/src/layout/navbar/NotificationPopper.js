import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  Popper,
  Typography,
} from "@mui/material";

import UserAvatar from "../../components/UserAvatar";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getAllUserNotifications } from "../../redux/actions/notification.action";
//HELPERS
import { capitalizeFirstLetter } from "../../helpers/allHelpers";
import moment from "moment";

const NotificationPopper = props => {
  const { anchorElNotification, clickAwayHandler } = props;

  const dispatch = useDispatch();

  const { notifications } = useSelector(state => state.notification);
  const user = useSelector(state => state.user);

  const { socket } = useSelector(state => state.socket);

  const [loading, setLoading] = useState(true);
  // console.log(notifications);
  const handleAllUserNotifications = useCallback(() => {
    dispatch(
      getAllUserNotifications((err, success) => {
        setLoading(false);
        return;
      })
    );
  }, [dispatch]);

  const handleNotificationSocket = useCallback(() => {
    if (socket) {
      socket.on("notifications", notification => {
        handleAllUserNotifications();
      });
    }
  }, [handleAllUserNotifications, socket]);

  useEffect(() => {
    handleAllUserNotifications();
    handleNotificationSocket();
  }, [handleAllUserNotifications, handleNotificationSocket]);

  return (
    <Popper
      style={{
        maxHeight: 350,
        overflow: "auto",
      }}
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
                {notifications.map(notification => {
                  return (
                    <Box className="popper" m={1} key={notification.id}>
                      <Grid container sx={{ p: 1 }}>
                        <Grid item xs={2}>
                          <UserAvatar size={45} user={notification.sender} />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="body1">
                            {notification.body}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {moment(notification.createdAt).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Box>
                  );
                })}
              </Box>
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default NotificationPopper;
