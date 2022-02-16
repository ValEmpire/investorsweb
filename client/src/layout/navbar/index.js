import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
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

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null); // for menu on MenuIcon
  const [anchorElAvatar, setAnchorElAvatar] = React.useState(null); // for menu in AvatarIcon

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // application pages
  const pages = [
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Get Funding",
      path: "/projects",
    },
    {
      name: "About Us",
      path: "/aboutus",
    },
  ];

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
      path: "/projects",
    },
  ];

  // this handles opening and closing of MenuIcon
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // this handles opening and closing of AvatarIcon
  const handleOpenAvatarMenu = event => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorElAvatar(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleRedirect = path => {
    navigate(path);
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          ></Typography>

          {/* Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MenuIcon
              sx={{ marginRight: 2 }}
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </MenuIcon>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Map Pages */}
              {pages.map((page, i) => (
                <MenuItem
                  key={page.name + i}
                  onClick={() => handleRedirect(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Typography
            sx={{ marginRight: 2, cursor: "pointer" }}
            variant="h4"
            onClick={() => handleRedirect("/")}
            fontWeight={900}
            noWrap
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Menu
              id="avatar-menu-appbar"
              anchorEl={anchorElAvatar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElAvatar)}
              onClose={handleCloseAvatarMenu}
              sx={{
                display: { xs: "block" },
              }}
            >
              {/* Avatar Menus */}
              {userPages.map((page, i) => (
                <MenuItem
                  key={page.name + i}
                  onClick={() => handleRedirect(page.path)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>

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
              <IconButton
                sx={{ marginRight: 2 }}
                onClick={handleCloseNavMenu}
                color="inherit"
              >
                <Badge badgeContent={100} color="secondary">
                  <MessageIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleCloseNavMenu}
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <UserAvatar
                className="avatar"
                size="50"
                onClick={handleOpenAvatarMenu}
              />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
