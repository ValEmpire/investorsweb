import React, { Suspense } from "react";
import Wrapper from "../HOCs/wrapper";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = React.lazy(() => import("../routes/home"));

export default Wrapper(() => (
  <Suspense fallback={<CircularProgress />}>
    <HomePage />
  </Suspense>
));
