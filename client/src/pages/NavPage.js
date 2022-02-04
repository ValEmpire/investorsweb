import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const NavPage = React.lazy(() => import("../layout/navbar"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    < NavPage />
  </Suspense>
));
