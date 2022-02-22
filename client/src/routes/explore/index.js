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
  const handleChange = event => {
    const industry = event.target.value;

    props.setIndustry(industry);

    props.handleProjectFilter({ industry });
  };

  const { industries } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id="industry">All Industries</InputLabel>
      <Select
        labelId="industry"
        value={props.industry}
        label="All Industries"
        onChange={handleChange}
      >
        <MenuItem value={"All"}>All Industries</MenuItem>
        {industries.map((ind, i) => (
          <MenuItem key={ind + i} value={ind}>
            <span className="capitalize">{ind}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FundedFilter = props => {
  const handleChange = event => {
    const sort = event.target.value;

    props.setSort(sort);
    props.handleProjectFilter({ sort });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort">Funded</InputLabel>
      <Select
        labelId="sort"
        value={props.sort}
        label="Funded"
        onChange={handleChange}
      >
        <MenuItem value={"MostFunded"}>Most Funded</MenuItem>
        <MenuItem value={"LeastFunded"}>Least Funded</MenuItem>
        <MenuItem value={"RecentlyLaunched"}>Recently Launched</MenuItem>
        <MenuItem value={"ClosingSoon"}>Closing Soon</MenuItem>
      </Select>
    </FormControl>
  );
};

const ProgressFilter = props => {
  // this triggers the event change
  const handleChange = event => {
    const progress = event.target.value;

    props.setProgress(progress);

    props.handleProjectFilter({ progress });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="progress">Progress</InputLabel>
      <Select
        labelId="progress"
        value={props.progress}
        label="Progress"
        onChange={handleChange}
      >
        <MenuItem value={"InProgress"}>In Progress</MenuItem>
        <MenuItem value={"Completed"}>Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

const Explore = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState("InProgress");
  const [industry, setIndustry] = React.useState("All");
  const [sort, setSort] = React.useState("MostFunded");
  const [loading, setLoading] = useState(true);

  const handleProjects = useCallback(() => {
    dispatch(
      getAllProjects(progress, industry, sort, (err, success) => {
        if (success) {
          setLoading(false);
        }

        return;
      })
    );

    return;
  }, [dispatch, industry, progress, sort]);

  const { projects } = useSelector(state => state.project);

  const { industries } = useSelector(state => state.project);

  useEffect(() => {
    handleProjects();
  }, [handleProjects]);

  const handleProjectFilter = function (filter) {
    setLoading(true);

    dispatch(
      getAllProjects(
        filter.progress ?? progress,
        filter.industry ?? industry,
        filter.sort ?? sort,
        (err, success) => {
          if (success) {
            setLoading(false);
          }

          return;
        }
      )
    );

    setLoading(false);

    return;
  };

  const getAllIndustries = projects => {
    const industries = [];

    for (const project of projects) {
      const industry = project.industry;

      if (!industries.includes(industry)) {
        industries.push(industry);
      }
    }

    return industries;
  };

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
                    <ProgressFilter
                      handleProjectFilter={handleProjectFilter}
                      progress={progress}
                      setProgress={setProgress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <IndustryFilter
                      handleProjectFilter={handleProjectFilter}
                      industry={industry}
                      setIndustry={setIndustry}
                      industries={getAllIndustries(industries)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FundedFilter
                      handleProjectFilter={handleProjectFilter}
                      sort={sort}
                      setSort={setSort}
                    />
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
                <ProjectCard
                  key={project.name + i}
                  project={project}
                  to="projects"
                />
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Explore;
