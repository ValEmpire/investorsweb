import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  jumbotronWrapper: {
    backgroundColor: "#F9f9fb",
  },

  image: {
    backgroundImage: `url("https://mdbootstrap.com/img/Photos/Others/architecture.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "60vh",
    webkitTransform: "scaleX(-1)",
    transform: "scaleX(-1)",
  },
});

function Jumbotron() {
  const classes = useStyles();

  return (
    <Box className={classes.jumbotronWrapper} pt={2}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item md={4} sm={6} xs={12}>
            <Box pt={5} pb={5}>
              <Typography variant="h5" fontWeight={700}>
                WELCOME TO
              </Typography>
              <Typography variant="h3" color="primary">
                InvestorsWeb
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                A marketplace for entrepreneurs to showcase their startups and
                raise funding from investors.
              </Typography>
              <Box pt={3}>
                <Button variant="contained" size="large">
                  Invest Now
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={8} sm={6} xs={12}>
            <Box className={classes.image} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Jumbotron;
