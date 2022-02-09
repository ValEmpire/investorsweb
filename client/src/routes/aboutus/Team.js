import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container, Row, Col } from "react-grid-system";

const Team = () => {
  return (
    <Container>
      <Row>
        <Grid container alignItems="center" justifyContent="center">
          <Typography variant="h4" className="header-message">
            <b>OUR TEAM</b>
          </Typography>
        </Grid>
        <Box pt={1} pb={6}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item md={6} sm={8} xs={12}>
              <Row>
                <Col sm={4}>
                  <Box
                    pt={8}
                    pb={6}
                    width={500}
                    height={100}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h5" color="primary">
                      <b>ValEmpire </b>
                    </Typography>
                    <Button
                      href="https://github.com/ValEmpire"
                      variant="outlined"
                    >
                      Follow
                    </Button>
                  </Box>
                </Col>
                <Col sm={4}>
                  <Box
                    pt={8}
                    pb={12}
                    width={500}
                    height={100}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h5" color="primary">
                      <b>NehaYadav</b>
                    </Typography>
                    <Button
                      href="https://github.com/NehaYadav903"
                      variant="outlined"
                    >
                      Follow
                    </Button>
                  </Box>
                </Col>
                <Col sm={4}>
                  <Box
                    pt={8}
                    pb={12}
                    width={500}
                    height={100}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h5" color="primary">
                      <b>ValeraNeg</b>
                    </Typography>
                    <Button
                      href="https://github.com/Valera-Neg"
                      variant="outlined"
                    >
                      Follow
                    </Button>
                  </Box>
                </Col>
              </Row>
            </Grid>
          </Grid>
        </Box>
      </Row>
    </Container>
  );
};

export default Team;
