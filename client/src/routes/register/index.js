import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import AuthBackground from "../../components/AuthBackground";
import Link from "../../components/Link";
import { Container } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/user.action";
import { setLoadingRegister } from "../../redux/actions/loading.action";

export default function Register() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [fieldError, setFieldError] = useState({});

  const { loadingRegister } = useSelector(state => state.loading);

  const onFieldChange = e => {
    const { value, name } = e.target;

    switch (name) {
      case "firstName":
        setFieldError({
          ...fieldError,
          [name]:
            value.trim().length < 3
              ? "First name must be longer than 2 characters."
              : "",
        });
        break;

      case "lastName":
        setFieldError({
          ...fieldError,
          [name]:
            value.trim().length < 3
              ? "Last name must be longer than 2 characters."
              : "",
        });
        break;

      case "email":
        setFieldError({
          ...fieldError,
          [name]: value
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? ""
            : "Invalid email",
        });
        break;

      case "password":
        setFieldError({
          ...fieldError,
          [name]:
            value.length < 7
              ? "Password must be longer than 6 characters."
              : "",
          repeatPassword: user.repeatPassword
            ? value !== user.repeatPassword
              ? "Repeat password must be the same with password."
              : ""
            : "",
        });

        break;

      case "repeatPassword":
        setFieldError({
          ...fieldError,
          [name]:
            value !== user.password
              ? "Repeat password must be the same with password."
              : "",
        });

        break;

      default:
        break;
    }

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(setLoadingRegister(true));

    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName"),
      lastName = data.get("lastName"),
      email = data.get("email"),
      password = data.get("password");

    let hasError = false;

    for (const key in fieldError) {
      if (fieldError[key]) hasError = true;
    }

    for (const field in user) {
      if (!user[field]) hasError = true;
    }

    if (hasError) {
      return;
    }

    // dispatch to redux actions
    await dispatch(
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
              autoComplete="off"
            >
              <TextField
                margin="normal"
                autoComplete="off"
                required
                fullWidth
                name="firstName"
                label="First Name"
                autoFocus
                onChange={onFieldChange}
                error={fieldError["firstName"] ? true : false}
                helperText={fieldError["firstName"]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                onChange={onFieldChange}
                error={fieldError["lastName"] ? true : false}
                helperText={fieldError["lastName"]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                label="Email Address"
                name="email"
                onChange={onFieldChange}
                error={fieldError["email"] ? true : false}
                helperText={fieldError["email"]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={onFieldChange}
                error={fieldError["password"] ? true : false}
                helperText={fieldError["password"]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                onChange={onFieldChange}
                error={fieldError["repeatPassword"] ? true : false}
                helperText={fieldError["repeatPassword"]}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loadingRegister}
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
