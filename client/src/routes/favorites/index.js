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

import Loading from "../../components/Loading";
import ProjectCard from "../../components/ProjectCard";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllFavoriteProjects } from "../../redux/actions/project.action";

const ProjectDashboardPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { favoriteProjects } = useSelector(state => state.project);

  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("recently");

  const handleFavoriteProjects = useCallback(() => {
    dispatch(
      getAllFavoriteProjects((err, success) => {
        if (success) {
          setLoading(false);
        }

        return;
      })
    );

    return;
  }, [dispatch]);

  const handleFilterChange = e => {
    const val = e.target.value;

    setSort(val);
  };

  useEffect(() => {
    handleFavoriteProjects();
  }, [handleFavoriteProjects]);

  return (
    <Container maxWidth="lg" component={Box} pb={2} mb={2}>
      <Box pb={2} mb={1}>
        <Box pb={6} textAlign="center">
          <PageTitle>My Favorites</PageTitle>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Your favorite projects will be here.
          </Typography>

          <Box pt={2} mt={2}>
            <Button onClick={() => navigate("/explore")} variant="contained">
              Explore Projects
            </Button>
          </Box>
        </Box>

        <Grid container justifyContent={"right"}>
          <Grid item md={2} sm={4} xs={6}>
            <FormControl disabled={favoriteProjects.length === 0} fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select value={sort} label="Filter" onChange={handleFilterChange}>
                <MenuItem value={"recently"}>Recently</MenuItem>
                <MenuItem value={"oldest"}>Oldest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading && <Loading height={400} />}

      {!loading && favoriteProjects.length > 0 && (
        <Grid container spacing={4}>
          {favoriteProjects
            .sort((a, b) => {
              switch (sort) {
                case "recently":
                  return b.id - a.id;

                case "oldest":
                  return a.id - b.id;

                default:
                  return 0;
              }
            })
            .map((data, i) => (
              <ProjectCard
                key={data.project.name + i}
                project={data.project}
                to="projects"
              />
            ))}
        </Grid>
      )}

      {!loading && favoriteProjects.length === 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">You have no favorite project.</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProjectDashboardPage;
