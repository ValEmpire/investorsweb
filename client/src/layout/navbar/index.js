import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MessageIcon from "@mui/icons-material/Message";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user.action";
import UserAvatar from "../../components/UserAvatar";
import NotificationPopper from "./NotificationPopper";
import AvatarPopper from "./AvatarPopper";
import MenuPopper from "./MenuPopper";
//REDUX
import { updateNotification } from "../../redux/actions/notification.action";

const ResponsiveAppBar = () => {
  const [anchorElMenu, setAnchorElMenu] = useState(null); // for menu on MenuIcon
  const [anchorElAvatar, setAnchorElAvatar] = useState(null); // for menu in AvatarIcon
  const [anchorElNotification, setAnchorElNotification] = useState(null);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications } = useSelector(state => state.notification);
  const countNotSeenNotification = () => {
    let countNotSeenNotification = 0;
    for (const notification of notifications) {
      if (!notification.isSeen) {
        countNotSeenNotification++;
      }
    }
    return countNotSeenNotification;
  };
  // application pages
  const pages = [
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Get Funding",
      path: "/projects/dashboard",
    },
    {
      name: "Favorites",
      path: "/favorites",
    },
    {
      name: "About Us",
      path: "/aboutus",
    },
  ];

  const handleLogout = () => {
    // close anchor first before dispatching
    setAnchorElAvatar(null);

    dispatch(logoutUser());
  };

  const handleRedirect = path => {
    navigate(path);
  };

  const clickAwayNotificationHandler = () => {
    setAnchorElNotification(null);
  };

  const clickAwayAvatarHandler = () => {
    setAnchorElAvatar(null);
  };

  const clickAwayMenuHandler = () => {
    setAnchorElMenu(null);
  };

  const resetNotificationBadge = () => {
    dispatch(updateNotification());
  };

  const handleNotificationPopper = event => {
    setAnchorElNotification(event.currentTarget);
    resetNotificationBadge();
  };

  const handleAvatarPopper = event => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleMenuPopper = event => {
    setAnchorElMenu(event.currentTarget);
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MenuIcon
              sx={{ marginRight: 2 }}
              size="large"
              onClick={handleMenuPopper}
            />
          </Box>

          {/* Logo */}
          <Typography
            sx={{ marginRight: 2, cursor: "pointer" }}
            variant="h4"
            onClick={() => handleRedirect("/")}
            fontWeight={700}
            component="div"
          >
            <i>iWeb</i>
          </Typography>

          {/* Big screen */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={page.name + i}
                onClick={() => handleRedirect(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}></Box>

          {/* Auth buttons */}
          {!user.firstName && (
            <>
              <Button
                onClick={() => handleRedirect("/login")}
                color="inherit"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>

              <Button
                onClick={path => handleRedirect("/register")}
                color="inherit"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Register
              </Button>
            </>
          )}
          {user.firstName && (
            <>
              <IconButton sx={{ marginRight: 2 }} color="inherit">
                <Badge badgeContent={100} color="warning">
                  <MessageIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleNotificationPopper}
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                <Badge
                  invisible={countNotSeenNotification() === 0 ? true : false}
                  badgeContent={countNotSeenNotification()}
                  color="warning"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* UserAvatar */}
              <UserAvatar
                className="avatar"
                size="50"
                onClick={handleAvatarPopper}
                user={user}
              />

              {/* Poppers */}
              <NotificationPopper
                clickAwayHandler={clickAwayNotificationHandler}
                anchorElNotification={anchorElNotification}
              />
              <AvatarPopper
                anchorElAvatar={anchorElAvatar}
                clickAwayHandler={clickAwayAvatarHandler}
                user={user}
                handleRedirect={handleRedirect}
                handleLogout={handleLogout}
              />
            </>
          )}
          <MenuPopper
            anchorElMenu={anchorElMenu}
            handleRedirect={handleRedirect}
            clickAwayHandler={clickAwayMenuHandler}
            pages={pages}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
