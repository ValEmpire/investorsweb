import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const NavPage = React.lazy(() => import("../routes/projects/navbar"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    < NavPage />
  </Suspense>
));
