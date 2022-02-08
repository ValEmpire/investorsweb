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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

import Moment from "moment";
import { amountReducer } from "../../../helpers/amountReducer";

export default function DashboardView(props) {
  const projects = props.projects;

  return (
    <>
      <Box mt={2} pt={2} pb={2} mb={2}>
        <Grid container spacing={12}>
          {projects.map((project, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Link className="link" to="/projects/:projectId">
                <Card>
                  <CardMedia
                    component="img"
                    image={project.logo.url}
                    alt={"image id #" + project.logo.id}
                  />
                  <Box textAlign="center" pt={2} mt={1} pb={2}>
                    <Typography
                      className="capitalize"
                      gutterBottom
                      variant="h5"
                      color="primary"
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
                      <Typography>{project.story.slice(0, 36)}...</Typography>
                    </Box>

                    <Box pb={3} pl={2} pr={2}>
                      <Typography noWrap>{project.story}</Typography>
                      <br />
                      <Typography>
                        Dedline:{" "}
                        <strong>
                          {Moment(project.deadline).format("d MMM YYYY")}
                        </strong>
                      </Typography>
                    </Box>
                  </Box>

                  <Box mr={2} ml={2}>
                    <Divider sx={{ background: "#1876D2" }} />
                  </Box>

                  <Stack
                    sx={{ pb: 3, pt: 3, pl: 1, pr: 1 }}
                    direction="row"
                    spacing={3}
                    justifyContent="space-around"
                  >
                    <span>
                      <Typography variant="h6">
                        <strong>{amountReducer(project.raisedAmount)}</strong>
                      </Typography>

                      <Typography fontSize={12}>{"Raised Amount"}</Typography>
                    </span>
                    <Divider orientation="vertical" flexItem />
                    <span>
                      <Typography variant="h6">
                        <strong>{amountReducer(project.targetFund)}</strong>
                      </Typography>
                      <Typography fontSize={12}>Target Fund</Typography>
                    </span>
                    <Divider orientation="vertical" flexItem />
                    <span>
                      <Typography variant="h6">
                        <strong>{amountReducer(project.minInvestment)}</strong>
                      </Typography>
                      <Typography fontSize={12}> Min Investment </Typography>
                    </span>
                  </Stack>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
