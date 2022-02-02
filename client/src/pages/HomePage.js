import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = React.lazy(() => import("../routes/home"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <HomePage />
  </Suspense>
));
