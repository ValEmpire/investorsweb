import * as React from "react";
// import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { display } from "@mui/system";
// import { blue, blueGrey } from "@mui/material/colors";

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function DashboardView() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Your Projects
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="/projects/create">
                Create New Project
              </Button>
              {/* <Button variant="outlined">Dedline</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          {/* End hero unit */}

          <Grid container spacing={12}>
            {cards.map((card) => (
              <Grid item key={card} xs={8} sm={5} md={4} mt={0}>
                <Link href="/projects/:id" underline="none">
                  <Card
                    sx={{
                      weight: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{ pb: 1, pt: 4, pl: 1 }}
                        gutterBottom
                        variant="h4"
                        component="h3"
                      >
                        <strong>Project Name</strong>
                      </Typography>
                      <Typography
                        sx={{ pb: 1, pt: 4, pl: 1 }}
                        display={"inline"}
                      ></Typography>
                      <Typography style={{ display: "inline" }}>
                        Story some stoty going here...
                      </Typography>
                      <Typography sx={{ pb: 1, pt: 1, pl: 1, mt: 2 }}>
                        Dedline: <strong>12/12/2025</strong>
                      </Typography>
                    </CardContent>
                    <Divider color="#e3f2fd" />

                    <Stack
                      sx={{ pb: 2, pt: 4, pl: 1, pr: 1 }}
                      direction="row"
                      spacing={3}
                      justifyContent="space-around"
                    >
                      <Typography fontFamily={"sans-serif"}>
                        <strong>$20.000</strong>

                        <Typography fontSize={12}>{"Raised amoubt"}</Typography>
                      </Typography>

                      <Typography>
                        <strong>$2.5M</strong>
                        <Typography fontSize={12}> Target amount </Typography>
                      </Typography>
                      <Typography>
                        <strong>$300</strong>

                        <Typography fontSize={12}> Min Invest </Typography>
                      </Typography>
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
