import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const CreateProjectPage = React.lazy(() => import("../routes/projects/create"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <CreateProjectPage />
  </Suspense>
));
