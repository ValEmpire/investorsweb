import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

export default class NextJsCarousel extends Component {
  render() {
    return (
      <Grid container spacing={4}>
        <div>
          <Carousel>
            <div>
              <img src="./images/market1.jpeg" alt="image1" />
            </div>
            <div>
              <img src="./images/market2.jpeg" alt="image2" />
            </div>
            <div>
              <img src="./images/market3.jpeg" alt="image3" />
            </div>
          </Carousel>
          <Box my={4}>
            <Typography variant="h6" paragraph align="center">
              These testimonials may not be representative of the experience of
              other customers. These testimonials are no guarantee of future
              performance or success.
            </Typography>
          </Box>
        </div>
      </Grid>
    );
  }
}