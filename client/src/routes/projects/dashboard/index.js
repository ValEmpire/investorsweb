import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardView from "./DashboardView";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../helpers/allHelpers";

import Loading from "../../../components/Loading";

const ProjectDashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);

  const getAllProject = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/user`,
      {
        withCredentials: true,
      }
    );

    setProjects(res.data.userProjects);

    setLoading(false);

    return;
  };

  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box pt={8} pb={6} textAlign="center">
        <Typography
          component="h1"
          variant="h3"
          color="text.primary"
          gutterBottom
        >
          Project Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {capitalizeFirstLetter(user.firstName)}, you created {projects.length}{" "}
          projects
        </Typography>
        <Box pt={2} mt={2}>
          <Link className="link" to="/projects/create">
            <Button variant="contained">Create New Project</Button>
          </Link>
        </Box>
      </Box>

      <Divider />

      {loading && <Loading height={400} />}

      {projects.length > 0 && <DashboardView projects={projects} />}
    </Container>
  );
};

export default ProjectDashboardPage;
