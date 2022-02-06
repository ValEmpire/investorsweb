import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const ProjectViewPage = React.lazy(() => import("../routes/projects/project"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <ProjectViewPage />
  </Suspense>
));
