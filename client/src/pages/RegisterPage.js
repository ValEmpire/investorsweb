import React, { Suspense } from "react";
import Wrapper from "../HOCs/wrapper";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterPage = React.lazy(() => import("../routes/register"));

export default Wrapper(() => (
  <Suspense fallback={<CircularProgress />}>
    <RegisterPage />
  </Suspense>
));
