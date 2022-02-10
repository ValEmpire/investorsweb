import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  image: {
    backgroundImage: `url(${"/images/entrepreneur.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "70vh",
    webkitTransform: "scaleX(-1)",
    transform: "scaleX(-1)",
  },
});

function Head() {
  const classes = useStyles();

  return (
    <Box pt={1}>
      <Container maxWidth="x-lg">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item md={4} sm={6} xs={12}>
            <Box pt={8} pb={12} bgcolor="white">
              <Typography variant="h3" color="primary">
                About <b>InvestorsWeb</b>
              </Typography>

              <Typography variant="subtitle1">
                This website was developed by students of Lighthouse Labs for
                their final project.
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
