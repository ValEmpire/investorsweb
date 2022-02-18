import React from "react";
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
    },
    {
      name: "My Investments",
      path: "/user/dashboard",
    },
    {
      name: "My Projects",
      path: "/projects/dashboard",
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

                {/* Page Links */}
                {userPages.map((page, i) => (
                  <Box
                    key={page.path + i}
                    className="popper"
                    m={1}
                    onClick={() => handleRedirect(page.path)}
                  >
                    <Grid container sx={{ p: 1 }} alignItems="center">
                      <Grid item xs={12}>
                        <Box>
                          <Typography noWrap variant="body1">
                            {page.name}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}

                {/* Logout */}
                <Box className="popper" m={1} onClick={handleLogout}>
                  <Grid container sx={{ p: 1 }} alignItems="center">
                    <Grid item xs={12}>
                      <Typography noWrap variant="body1">
                        Logout
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

export default AvatarPopper;
