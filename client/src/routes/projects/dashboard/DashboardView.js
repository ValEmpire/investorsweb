import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

import Moment from "moment";
import { amountReducer } from "../../../helpers/amountReducer";

export default function DashboardView(props) {
  const projects = props.projects;
  return (
    <Grid>
      <Box pt={8} pb={6}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Project Dashboard
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Link className="link" to="/projects/create">
              <Button variant="contained">Create New Project</Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      {/* Project container */}
      <Container maxWidth="lg">
        <Grid container spacing={12}>
          {projects.map((project, i) => (
            <Grid item key={i} xs={8} sm={5} md={4}>
              <Link className="link" to="/projects/:projectId">
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
                    image={project.logo.url}
                    alt={"image id #" + project.logo.id}
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
                    <Typography sx={{ overflow: "auto" }}>
                      {project.story}
                    </Typography>

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
                        <strong>{amountReducer(project.minInvestment)}</strong>
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
    </Grid>
  );
}
