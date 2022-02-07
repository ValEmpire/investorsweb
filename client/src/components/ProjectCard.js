import React from "react";
import {
  Card,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "moment";
import { amountReducer } from "../helpers/amountReducer";

const ProjectCard = (props) => {
  const project = props.project;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link className="link" to={`/projects/${project.id}`}>
        <Card>
          <CardMedia
            component="img"
            image={project.logo ? project.logo.url : null}
            alt={project.name}
          />
          <Box>
            <Box textAlign="center" pt={2} mt={1} pb={2}>
              <Typography
                className="capitalize"
                gutterBottom
                variant="h5"
                color="primary"
              >
                <strong>{project.name}</strong>
              </Typography>
            </Box>

            <Box pb={3} pl={2} pr={2}>
              <Typography noWrap>{project.story}</Typography>
              <br />
              <Typography>
                Dedline:{" "}
                <strong>{Moment(project.deadline).format("d MMM YYYY")}</strong>
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
  );
};

export default ProjectCard;
