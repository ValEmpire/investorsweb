import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

const Story = props => {
  const { story } = props.project;

  return (
    <Grid>
      <Box>
        <Typography variant="body1" color="text.secondary">
          {story ?? "Pitch your story here."}
        </Typography>
      </Box>
    </Grid>
  );
};
export default Story;
