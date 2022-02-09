import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Container, Row, Col } from "react-grid-system";

const Values = () => {
  return (
    <Box pt={6} pb={6}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={6} sm={8} xs={12}>
          <div>
            <Grid container>
              <Grid item xs={12} container justify="center">
                <Typography variant="h4" className="header-message">
                  <b>OUR VALUES</b>
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <div>
                    <Grid item>
                      <Stack direction="row" spacing={2}>
                        <Grid item xs={12} container justify="center">
                          <Typography variant="h12" className="header-message">
                            We have 6 core values at StartEngine. They are the
                            standard that we hold ourselves to in how we
                            interact with each other as well as with our
                            community.
                          </Typography>
                        </Grid>
                      </Stack>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Grid>
              <Grid item xs={12}>
                <Container>
                  <Row>
                    <Col sm={4}>
                      <Typography variant="title" color="primary">
                        <b>Own the Mission</b>
                      </Typography>

                      <Typography variant="subtitle1">
                        We believe in StartEngine’s vision and are passionate
                        about helping founders.
                      </Typography>
                    </Col>
                    <Col sm={4}>
                      <Typography variant="title" color="primary">
                        <b>Exceed Expectations</b>
                      </Typography>

                      <Typography variant="subtitle1">
                        We work hard, commit to deadlines, and are never
                        satisfied.
                      </Typography>
                    </Col>
                    <Col sm={4}>
                      <Typography variant="title" color="primary">
                        <b>Be a Team Player</b>
                      </Typography>

                      <Typography variant="subtitle1">
                        We are selfless, collaborative and accountable.
                      </Typography>
                    </Col>
                    <Col sm={4}>
                      <Typography variant="title" color="primary">
                        <b>Stay Curious</b>
                      </Typography>

                      <Typography variant="subtitle1">
                        We think outside the box and question the status quo
                        every day.
                      </Typography>
                    </Col>
                    <Col sm={4}>
                      <Typography variant="title" color="primary">
                        <b>Do the Right Thing</b>
                      </Typography>

                      <Typography variant="subtitle1">
                        We protect our reputation and do right by our customers
                        and investors.
                      </Typography>
                    </Col>

                    <Col sm={4}>
                      <Typography variant="title" color="primary">
                        <b>Care About Others</b>
                      </Typography>

                      <Typography variant="subtitle1">
                        We show respect to each other and are considerate in how
                        we treat others.
                      </Typography>
                    </Col>
                  </Row>
                </Container>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Values;
