import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const Mission = () => {
  return (
    <Container maxWidth="x-lg" component={Box} mb={2} pb={2}>
      <Grid container>
        <Grid item sm={4}>
          <CardMedia
            component="img"
            image="/images//stock-exchange.jpg"
            alt="green iguana"
          />
        </Grid>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <Box
            pt={5}
            pb={12}
            height="100%"
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
          >
            <Box>
              <Typography variant="h5" color="primary">
                <b>OUR COMPANY MISSION</b>
              </Typography>
              <Typography variant="h5">
                <b>Help Entrepreneurs Achieve Their Dreams</b>
              </Typography>
              <Typography variant="subtitle1">
                At InvestorsWeb, our mission is to help other entrepreneurs and
                founders just like us raise the funds they need to grow and
                achieve their dreams.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mission;
