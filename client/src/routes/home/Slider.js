import React from "react";
import { Carousel } from "react-responsive-carousel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  return (
    <Box pt={6} pb={6}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={6} sm={8} xs={12}>
          <Carousel showThumbs={false}>
            <div>
              <img src="/images/market1.jpeg" alt="image1" />
            </div>
            <div>
              <img src="/images/market2.jpeg" alt="image2" />
            </div>
            <div>
              <img src="/images/market3.jpeg" alt="image3" />
            </div>
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Slider;

