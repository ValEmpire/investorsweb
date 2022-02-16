import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Redux
import { useDispatch } from "react-redux";
import { createProject } from "../../../redux/actions/project.action";
import { Box } from "@mui/material";

export default function ProjectDetails() {
  const dispatch = useDispatch();

  const handleField = e => {
    const field = {};

    field[e.target.name] = e.target.value;

    dispatch(createProject(field));
  };

  return (
    <>
      <Box pb={1}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Details
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            required
            id="name"
            name="name"
            label="Project Name"
            fullWidth
            autoFocus
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            margin="dense"
            id="location"
            name="location"
            label="Location"
            fullWidth
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            margin="dense"
            id="website"
            name="website"
            label="Website"
            fullWidth
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="targetFund"
            name="targetFund"
            margin="dense"
            label="Target Fund"
            fullWidth
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="industry"
            name="industry"
            margin="dense"
            label="Industry"
            fullWidth
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
            margin="dense"
            placeholder="mm-dd-yyyy"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="minInvestment"
            margin="dense"
            name="minInvestment"
            label="Minimum Investment"
            fullWidth
            onChange={handleField}
          />
        </Grid>
      </Grid>
    </>
  );
}
