import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterPage = React.lazy(() => import("../routes/register"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <RegisterPage />
  </Suspense>
));
