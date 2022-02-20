import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../../redux/actions/project.action";
import { Box } from "@mui/material";

export default function ProjectDetails() {
  const dispatch = useDispatch();

  const { projectFields } = useSelector(state => state.project);

  const {
    name,
    location,
    website,
    targetFund,
    industry,
    deadline,
    minInvestment,
  } = projectFields;

  const handleField = e => {
    const field = {};

    field[e.target.name] = e.target.value;

    dispatch(createProject(field));

    return;
  };

  return (
    <Box pb={3} pt={2} mb={1}>
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
            value={name ?? ""}
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
            value={location ?? ""}
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
            value={website ?? ""}
            fullWidth
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberFormat
            customInput={TextField}
            onValueChange={e => {
              const event = {
                target: {
                  name: "targetFund",
                  value: e.value,
                },
              };

              return handleField(event);
            }}
            value={targetFund ?? ""}
            variant="outlined"
            fullWidth
            decimalScale={2}
            thousandSeparator=","
            label="Target Fund"
            fixedDecimalScale
            prefix="$ "
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="industry"
            name="industry"
            margin="dense"
            label="Industry"
            value={industry ?? ""}
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
            value={deadline ? deadline.substring(0, 10) : ""}
            margin="dense"
            placeholder="mm-dd-yyyy"
            onChange={handleField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberFormat
            customInput={TextField}
            onValueChange={e => {
              const event = {
                target: {
                  name: "minInvestment",
                  value: e.value,
                },
              };

              return handleField(event);
            }}
            value={minInvestment ?? ""}
            variant="outlined"
            fullWidth
            decimalScale={2}
            thousandSeparator=","
            label="Minimum Investment"
            fixedDecimalScale
            prefix="$ "
          />
        </Grid>
      </Grid>
    </Box>
  );
}
