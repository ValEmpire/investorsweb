import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import AuthBackground from "../../components/AuthBackground";
import { Link } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/user.action";
import { Container } from "@mui/material";

export default function Register() {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName"),
      lastName = data.get("lastName"),
      email = data.get("email"),
      password = data.get("password"),
      repeatPassword = data.get("repeatPassword");

    //chenge it letter
    if (repeatPassword !== password) {
      return alert("Passwords not match");
    }

    // dispatch to redux actions
    dispatch(
      registerUser({
        firstName,
        lastName,
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
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {" "}
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                id="firstName"
                autoFocus
              />{" "}
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
              />{" "}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="repeatPassword"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">{"Already have an account? Log in"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
