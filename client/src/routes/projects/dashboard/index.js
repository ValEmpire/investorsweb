import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PageTitle from "../../../components/PageTitle";

import Loading from "../../../components/Loading";
import ProjectCard from "../../../components/ProjectCard";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectDraft,
  getAllUserProjects,
} from "../../../redux/actions/project.action";

const ProjectDashboardPage = () => {
  const dispatch = useDispatch();

  const { userProjects } = useSelector(state => state.project);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const handleUserProjects = async () => {
    await dispatch(getAllUserProjects());

    setLoading(false);

    return;
  };

  const handleNewProject = () => {
    dispatch(createProjectDraft());
  };

  const handleFilterChange = e => {
    const val = e.target.value;

    setFilter(val);
  };

  useEffect(() => {
    handleUserProjects();
  }, []);

  return (
    <Container maxWidth="lg" component={Box} pb={2} mb={2}>
      <Box pb={2} mb={1}>
        <Box pb={6} textAlign="center">
          <PageTitle>My Projects Dashboard</PageTitle>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Powerful Visual Data About Your Projects
          </Typography>

          <Box pt={2} mt={2}>
            <Button onClick={handleNewProject} variant="contained">
              Create Project Draft
            </Button>
          </Box>
        </Box>

        <Grid container justifyContent={"right"}>
          <Grid item md={2} sm={4} xs={6}>
            <FormControl disabled={userProjects.length === 0} fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={handleFilterChange}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"live"}>Live</MenuItem>
                <MenuItem value={"draft"}>Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading && <Loading height={400} />}

      {!loading && userProjects.length > 0 && (
        <Grid container spacing={4}>
          {userProjects
            .filter(project => {
              if (filter === "live") {
                return project.isLive;
              }

              if (filter === "draft") {
                return !project.isLive;
              }

              return project.id;
            })
            .map((project, i) => (
              <ProjectCard
                key={project.name + i}
                project={project}
                to="dashboard"
              />
            ))}
        </Grid>
      )}

      {!loading && userProjects.length === 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6">
                You have no project. Please create project to start funding.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProjectDashboardPage;
