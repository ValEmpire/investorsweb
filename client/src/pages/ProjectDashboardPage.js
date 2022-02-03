import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const ProjectDashboardPage = React.lazy(() =>
  import("../routes/projects/dashboard")
);

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <ProjectDashboardPage />
  </Suspense>
));
