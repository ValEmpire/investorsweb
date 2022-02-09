import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { Container, Row, Col } from "react-grid-system";
const Mission = () => {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Grid item md={4} sm={6} xs={12}>
            <CardMedia
              component="img"
              sx={{
                height: 350,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              height="140"
              image="/images//stock-exchange.jpg"
              alt="green iguana"
            />
          </Grid>
        </Col>
        <Col sm={4}></Col>
        <Col sm={4}>
          <Box
            pt={5}
            pb={12}
            width={500}
            height={100}
            alignItems="right"
            justifyContent="right"
          >
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
        </Col>
      </Row>
    </Container>
  );
};

export default Mission;
