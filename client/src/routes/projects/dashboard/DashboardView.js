import React from "react";
import { Grid } from "@mui/material";
import ProjectCard from "../../../components/ProjectCard";

export default function DashboardView(props) {
  const projects = props.projects;

  return (
    <Grid container spacing={4}>
      {projects.map(project => (
        <ProjectCard project={project} />
      ))}
    </Grid>
  );
}
