import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Moment from "moment";
import { amountReducer } from "../../../helpers/allHelpers";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function DashboardView(props) {
  const projects = props.projects;
  console.log(projects);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Container sx={{ py: 0 }} maxWidth="lg">
          {/* End hero unit */}

          <Grid container spacing={12}>
            {projects.map(project => (
              <Grid item key={project.id} xs={8} sm={5} md={4} mt={0}>
                <Link href={"/projects/" + project.id} underline="none">
                  <Card
                    sx={{
                      height: "100%",
                      weight: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={project.logo ? project.logo.url : null}
                      alt={project.name}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 2,
                        ml: 2,
                        mr: 2,
                        mt: 1,
                        pb: 1,
                        pt: 1,
                      }}
                    ></CardContent>
                    <Box
                      sx={{
                        // flexGrow: 2,
                        ml: 2,
                        mr: 2,
                        mt: 1,
                        pb: 1,
                        pt: 1,
                      }}
                    >
                      <Typography
                        sx={{ pb: 1, pt: 4, pl: 1 }}
                        gutterBottom
                        variant="h4"
                        component="h3"
                      >
                        <strong>{project.name}</strong>
                      </Typography>
                      <Typography
                        sx={{ pb: 1, pt: 4, pl: 1 }}
                        display={"inline"}
                      ></Typography>
                      <Box
                        component="div"
                        sx={{ display: "line", textOverflow: "ellipsis" }}
                      >
                        <Typography>{project.story.slice(0, 34)}...</Typography>
                      </Box>

                      <Typography sx={{ pb: 1, pt: 1, pl: 1, mt: 2 }}>
                        Dedline:{" "}
                        <strong>
                          {Moment(project.deadline).format("d MMM YYYY")}
                        </strong>
                      </Typography>
                    </Box>
                    <Divider color="#e3f2fd" />

                    <Stack
                      sx={{ pb: 2, pt: 4, pl: 1, pr: 1 }}
                      direction="row"
                      spacing={3}
                      justifyContent="space-around"
                    >
                      <span>
                        <Typography fontFamily={"sans-serif"}>
                          <strong>{amountReducer(project.raisedAmount)}</strong>
                        </Typography>

                        <Typography fontSize={12}>{"Raised amoubt"}</Typography>
                      </span>
                      <span>
                        <Typography>
                          <strong>{amountReducer(project.targetFund)}</strong>
                        </Typography>
                        <Typography fontSize={12}>Target amount</Typography>
                      </span>
                      <span>
                        <Typography>
                          <strong>
                            {amountReducer(project.minInvestment)}
                          </strong>
                        </Typography>
                        <Typography fontSize={12}> Min Invest </Typography>
                      </span>
                    </Stack>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
