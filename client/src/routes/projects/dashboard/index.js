import React, { useCallback, useEffect, useState } from "react";

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

import Loading from "../../../components/Loading";
import ProjectCard from "../../../components/ProjectCard";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../../components/Link";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectDraft,
  getAllUserProjects,
} from "../../../redux/actions/project.action";
import { getAccount } from "../../../redux/actions/stripe.action";

const ProjectDashboardPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userProjects } = useSelector(state => state.project);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const { account } = useSelector(state => state.stripe);

  const { userDetail } = useSelector(state => state.user);

  const handleDashboardPage = useCallback(() => {
    dispatch(
      getAccount((err, success) => {
        if (success) {
          dispatch(
            getAllUserProjects((err, success) => {
              if (success) {
                setLoading(false);
              }

              return;
            })
          );
        }

        return;
      })
    );

    return;
  }, [dispatch]);

  const handleNewProject = () => {
    dispatch(
      createProjectDraft((err, projectId) => {
        if (projectId) {
          navigate(`/projects/dashboard/${projectId}`);
        }

        return;
      })
    );

    return;
  };

  const handleFilterChange = e => {
    const val = e.target.value;

    setFilter(val);
  };

  useEffect(() => {
    handleDashboardPage();
  }, [handleDashboardPage]);

  return (
    <Container maxWidth="lg" component={Box} pb={2} mb={2}>
      <Box pb={2} mb={1}>
        <Box pb={6} textAlign="center">
          <PageTitle>My Projects</PageTitle>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Powerful Visual Data About Your Projects
          </Typography>

          <Box pt={2} mt={2}>
            <Button
              onClick={handleNewProject}
              disabled={!account.payouts_enabled}
              variant="contained"
            >
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

      {!loading && (!account.payouts_enabled || !userDetail.id) && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">
              Please setup your account{" "}
              <CustomLink to="/user">
                <Typography
                  fontWeight={700}
                  sx={{ display: "inline" }}
                  variant="h6"
                  color="primary"
                >
                  here
                </Typography>
              </CustomLink>{" "}
              before creating project.{" "}
              <span className="bold">User details</span> and{" "}
              <span className="bold">Company account</span> is required.
            </Typography>
          </Grid>
        </Grid>
      )}

      {!loading &&
        account.payouts_enabled &&
        userDetail.id &&
        userProjects.length === 0 && (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">
                You have no project. Please create project to start funding.
              </Typography>
            </Grid>
          </Grid>
        )}
    </Container>
  );
};

export default ProjectDashboardPage;
