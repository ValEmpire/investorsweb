import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = React.lazy(() => import("../routes/login"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <LoginPage />
  </Suspense>
));
