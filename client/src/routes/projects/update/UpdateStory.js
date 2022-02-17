import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../../redux/actions/project.action";

export default function CreateStory() {
  const dispatch = useDispatch();

  const { projectFields } = useSelector(state => state.project);

  const { story } = projectFields;

  const handleField = e => {
    const field = {};

    field[e.target.name] = e.target.value;

    dispatch(createProject(field));
  };

  return (
    <>
      <Box pb={1} pt={3}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Story Pitch
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="story"
            name="story"
            label="Create your story"
            fullWidth
            variant="outlined"
            rows={12}
            value={story ?? ""}
            multiline
            onChange={handleField}
          />
        </Grid>
      </Grid>
    </>
  );
}
