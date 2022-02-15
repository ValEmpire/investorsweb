import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

const Story = () => {
  const [project, setProject] = useState([]);
  const { projectId } = useParams();

  const getProject = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    setProject(res.data.project);
    return;
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <Grid>
        <Box sx={{ width: "100%" }}>
          <Typography variant="body1" color="text.secondary">
            {project.story}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};
export default Story;
