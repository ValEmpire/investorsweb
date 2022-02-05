import React, { Suspense } from "react";
import Wrapper from "../HOCs/wrapper";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = React.lazy(() => import("../routes/login"));

export default Wrapper(() => (
  <Suspense fallback={<CircularProgress />}>
    <LoginPage />
  </Suspense>
));
