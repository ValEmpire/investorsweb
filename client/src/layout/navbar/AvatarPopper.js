import React from "react";
import {
  Avatar,
  Box,
  Card,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popper,
  Typography,
} from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const AvatarPopper = props => {
  const {
    anchorElAvatar,
    clickAwayHandler,
    user,
    handleRedirect,
    handleLogout,
  } = props;

  // menu of AvatarIcon
  const userPages = [
    {
      name: "Account",
      path: "/user",
      icon: AccountCircleOutlinedIcon,
    },
    {
      name: "My Investments",
      path: "/user/dashboard",
      icon: PaidOutlinedIcon,
    },
    {
      name: "My Projects",
      path: "/projects/dashboard",
      icon: BusinessCenterOutlinedIcon,
    },
  ];

  return (
    <Popper
      open={Boolean(anchorElAvatar)}
      anchorEl={anchorElAvatar}
      placement={"bottom-end"}
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={clickAwayHandler}>
          <Fade {...TransitionProps} timeout={100}>
            <Card component={Box} mt={1} width={"280px"} square>
              <Box>
                <Box pl={2} pt={2} pb={1}>
                  <Typography
                    className="capitalize"
                    fontWeight={700}
                    variant="h6"
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                </Box>
                <Divider />
                <List>
                  {/* Page Links */}
                  {userPages.map((page, i) => (
                    <ListItem
                      disablePadding
                      key={page.path + i}
                      onClick={() => handleRedirect(page.path)}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>
                            <page.icon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={page.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}

                  {/* Logout */}
                  <ListItem disablePadding onClick={handleLogout}>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <ExitToAppOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={"Logout"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default AvatarPopper;
