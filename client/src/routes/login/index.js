import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CustomLink from "../../components/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import AuthBackground from "../../components/AuthBackground";
import { Container, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

//Ridux
import { useDispatch, useSelector } from "react-redux";
import {
  githubLogin,
  googleLogin,
  loginUser,
} from "../../redux/actions/user.action";
import { setLoadingLogin } from "../../redux/actions/loading.action";

export default function LogIn() {
  const dispatch = useDispatch();

  const { loadingLogin } = useSelector(state => state.loading);

  const handleGoogleLogin = () => {
    dispatch(setLoadingLogin(true));

    dispatch(googleLogin());
  };

  const handleGithubLogin = () => {
    dispatch(setLoadingLogin(true));

    dispatch(githubLogin());
  };

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(setLoadingLogin(true));

    const data = new FormData(event.currentTarget);

    const email = data.get("email"),
      password = data.get("password");

    // dispach to redux action
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <AuthBackground />
        <Grid item xs={12} sm={8} md={4}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                disabled={loadingLogin}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <Box pt={1} mt={1}>
                    <CustomLink to="/register">
                      <Typography color="primary">
                        Don't have an account? Sign Up
                      </Typography>
                    </CustomLink>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={3} mb={1} pt={1} pb={4}>
                <Divider>
                  <Typography color="text.secondary">or</Typography>
                </Divider>
              </Box>
              <Box mt={1} pt={1}>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "#db4437",
                  }}
                  disabled={loadingLogin}
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                >
                  Continue with Google
                </Button>
              </Box>
              <Box mt={1} pt={1}>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "#333",
                  }}
                  disabled={loadingLogin}
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  onClick={handleGithubLogin}
                >
                  Continue with Github
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
