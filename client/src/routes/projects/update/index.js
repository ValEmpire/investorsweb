import React, { useCallback, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "../../../components/Link";
import Typography from "@mui/material/Typography";
import ProjectDetails from "./ProjectDetails";
import UpdateStory from "./UpdateStory";
import ProjectImage from "./ProjectImage";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../../redux/actions/project.action";
import Loading from "../../../components/Loading";

function Back() {
  const backTo = window.location.pathname.replace("update", "");

  return (
    <Box mt={1} pt={2}>
      <Typography variant="body2" color="text.secondary" align="center">
        <Link color="inherit" to={backTo}>
          Back To Project
        </Link>
      </Typography>
    </Box>
  );
}

export default function CreateProjectPage() {
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const { project } = useSelector(state => state.project);

  const handleProject = useCallback(async () => {
    await dispatch(getProject(projectId));

    setLoading(false);
  }, [dispatch, projectId]);

  useEffect(() => {
    handleProject();
  }, [handleProject]);

  return (
    <>
      <CssBaseline />

      {loading && <Loading height="80vh" />}

      {!loading && project.id && (
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            component={Box}
            mt={5}
            pt={6}
            pl={2}
            pr={2}
            pb={5}
          >
            <Typography variant="h4" align="center">
              Update Project
            </Typography>
            <Box p={2}>
              <ProjectDetails project={project} />
              <ProjectImage project={project} />
              <UpdateStory project={project} />
            </Box>
          </Paper>
          <Back />
        </Container>
      )}
    </>
  );
}
