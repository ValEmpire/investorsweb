import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

//REDUX
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import {
  getAllUserNotifications,
  updateNotification,
} from "../../redux/actions/notification.action";
//HELPERS
import moment from "moment";

const NotificationPopper = props => {
  const { anchorElNotification, clickAwayHandler } = props;
  console.log(props);
  const dispatch = useDispatch();

  const { notifications } = useSelector(state => state.notification);
  console.log(notifications);

  const [loading, setLoading] = useState(true);
  const handleAllUserNotifications = useCallback(() => {
    dispatch(
      getAllUserNotifications((err, success) => {
        setLoading(false);
        return;
      })
    );
  }, []);

  useEffect(() => {
    handleAllUserNotifications();
  }, []);

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
                {notifications.map(notification => (
                  <Box className="popper" m={1} key={notification.id}>
                    <Grid container sx={{ p: 1 }}>
                      <Grid item xs={2}>
                        <Avatar
                          alt={notification.sender.firstName}
                          src={
                            notification.sender.image
                              ? notification.sender.image.url
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography noWrap variant="body1">
                          {notification.body}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {moment(notification.createdAt).fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default NotificationPopper;
