import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  jumbotronWrapper: {
    backgroundColor: "#F9f9fb",
  },

  image: {
    backgroundImage: `url(${"/images/entrepreneur.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "lightblue",
    minHeight: "70vh",

    webkitTransform: "scaleX(-1)",
    transform: "scaleX(-1)",
  },
  root: {
    maxWidth: 345,
  },
});

function Head() {
  const classes = useStyles();

  return (
    <Box className={classes.jumbotronWrapper} pt={1}>
      <Container maxWidth="x-lg">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item md={4} sm={6} xs={12}>
            <Box pt={8} pb={12} bgcolor="white">
              <Typography variant="h3" color="primary">
                About <b>InvestersWeb</b>
              </Typography>
              <Typography variant="subtitle1">
                InvestersWeb enables everyday people to become angel investors
                by giving them access to startup investment opportunities.
              </Typography>
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

export default Head;
