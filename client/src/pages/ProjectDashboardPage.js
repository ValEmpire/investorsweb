import React, { Suspense } from "react";
import Wrapper from "../HOCs/wrapper";
import CircularProgress from "@mui/material/CircularProgress";

const ProjectDashboardPage = React.lazy(() =>
  import("../routes/projects/dashboard")
);

export default Wrapper(() => (
  <Suspense fallback={<CircularProgress />}>
    <ProjectDashboardPage />
  </Suspense>
));
