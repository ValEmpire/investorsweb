import React from "react";
import {
  Box,
  Card,
  ClickAwayListener,
  Fade,
  Grid,
  Popper,
  Typography,
} from "@mui/material";

const MenuPopper = props => {
  const { anchorElMenu, clickAwayHandler, handleRedirect, pages } = props;

  return (
    <Popper
      open={Boolean(anchorElMenu)}
      anchorEl={anchorElMenu}
      placement={"bottom-end"}
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={clickAwayHandler}>
          <Fade {...TransitionProps} timeout={100}>
            <Card component={Box} mt={2} width={"280px"} square>
              <Box>
                {/* Page Links */}
                {pages.map((page, i) => (
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
              </Box>
            </Card>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default MenuPopper;
