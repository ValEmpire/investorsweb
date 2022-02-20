import React, { useCallback, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProjectDetails from "./ProjectDetails";
import UpdateStory from "./UpdateStory";
import ProjectImage from "./ProjectImage";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { Button } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getProject,
  updateProject,
} from "../../../redux/actions/project.action";

export default function CreateProjectPage() {
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { project } = useSelector(state => state.project);

  const { projectFields } = useSelector(state => state.project);

  const handleProject = useCallback(() => {
    dispatch(
      getProject(projectId, (err, success) => {
        if (success) {
          setLoading(false);
        }

        return;
      })
    );

    return;
  }, [dispatch, projectId]);

  useEffect(() => {
    handleProject();
  }, [handleProject]);

  const goBack = () => {
    const backTo = window.location.pathname.replace("update", "");

    navigate(backTo);
  };

  const handleProjectSubmit = () => {
    dispatch(updateProject(projectFields, projectId));
  };

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
            <Box mt={2} pt={1} display="flex" justifyContent={"center"}>
              <Box width={150} m={1}>
                <Button fullWidth variant="outlined" onClick={goBack}>
                  Cancel
                </Button>
              </Box>
              <Box width={150} m={1}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleProjectSubmit}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}
