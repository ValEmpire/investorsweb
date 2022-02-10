import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Redux
import { useDispatch } from "react-redux";
import { createProject } from "../../../redux/actions/project.action";

export default function ProjectDetails() {
  const dispatch = useDispatch();

  const handleField = e => {
    const field = {};

    field[e.target.name] = e.target.value;

    dispatch(createProject(field));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Project details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Project Name"
            fullWidth
            autoFocus
            variant="standard"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="location"
            name="location"
            label="Location"
            fullWidth
            variant="standard"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="website"
            name="website"
            label="Website"
            fullWidth
            variant="standard"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="targetFund"
            name="targetFund"
            label="Target Fund"
            fullWidth
            variant="standard"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="industry"
            name="industry"
            label="Industry"
            fullWidth
            variant="standard"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="deadline"
            name="deadline"
            label="Deadline"
            fullWidth
            placeholder="mm-dd-yyyy"
            variant="standard"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="minInvestment"
            name="minInvestment"
            label="Minimum Investment"
            fullWidth
            variant="standard"
            onChange={handleField}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
