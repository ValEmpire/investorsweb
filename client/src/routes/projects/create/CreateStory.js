import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// Redux
import { useDispatch } from "react-redux";
import { createProject } from "../../../redux/actions/project.action";

export default function CreateStory() {
  const dispatch = useDispatch();

  const handleField = (e) => {
    const field = {};

    field[e.target.name] = e.target.value;

    dispatch(createProject(field));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Story Pitch
      </Typography>
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
            multiline
            onChange={handleField}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
