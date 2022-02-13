import React, { useEffect, useCallback, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllProjects } from "../../redux/actions/project.action";

const IndustryFilter = props => {
  const [industry, setIndustry] = React.useState("all");

  const handleChange = event => {
    setIndustry(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="techIndustry">All Industries</InputLabel>
      <Select
        labelId="techIndustry"
        value={industry}
        label="All Industries"
        onChange={handleChange}
      >
        <MenuItem value={"all"}>All Industries</MenuItem>
        <MenuItem value={"art"}>Art</MenuItem>
        <MenuItem value={"design"}>Design</MenuItem>
        <MenuItem value={"technology"}>Technology</MenuItem>
      </Select>
    </FormControl>
  );
};

const FundedFilter = props => {
  const [fund, setFund] = React.useState("most");

  const handleChange = event => {
    setFund(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="funded">Funded</InputLabel>
      <Select
        labelId="funded"
        value={fund}
        label="Funded"
        onChange={handleChange}
      >
        <MenuItem value={"most"}>Most Funded</MenuItem>
        <MenuItem value={"least"}>Least Funded</MenuItem>
        <MenuItem value={"recently"}>Recently Launched</MenuItem>
        <MenuItem value={"closing"}>Closing Soon</MenuItem>
      </Select>
    </FormControl>
  );
};

const ProgressFilter = props => {
  const [progress, setProgress] = React.useState("in progress");

  const handleChange = event => {
    setProgress(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="progress">Progress</InputLabel>
      <Select
        labelId="progress"
        value={progress}
        label="Progress"
        onChange={handleChange}
      >
        <MenuItem value={"in progress"}>In Progress</MenuItem>
        <MenuItem value={"completed"}>Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

const Explore = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const handleProjects = useCallback(async () => {
    await dispatch(getAllProjects());

    setLoading(false);

    return;
  }, [dispatch]);

  const { projects } = useSelector(state => state.project);

  useEffect(() => {
    handleProjects();
  }, [handleProjects]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Box pb={3} mb={3}>
          {/* Page Title */}
          <PageTitle>Find a project. Become its next investor</PageTitle>

          <Box mb={3}>
            <Grid container justifyContent={"center"}>
              <Grid item md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <ProgressFilter />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <IndustryFilter />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FundedFilter />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {loading && <Loading height={300} />}

      {!loading && (
        <Box bgcolor={"#f7f7f7"} pb={5}>
          <Box textAlign={"center"} pt={5} pb={5}>
            <Typography variant="h5">
              Discover <span className="projectsCount">{projects.length}</span>{" "}
              Projects
            </Typography>
          </Box>

          <Container maxWidth="lg">
            {/* Discover */}
            <Grid container spacing={4}>
              {projects.map((project, i) => (
                <ProjectCard key={project.name + i} project={project} />
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Explore;
