import React, { Suspense } from "react";
import Wrapper from "../HOCs/wrapper";
import CircularProgress from "@mui/material/CircularProgress";

const CreateProjectPage = React.lazy(() => import("../routes/projects/create"));

export default Wrapper(() => (
  <Suspense fallback={<CircularProgress />}>
    <CreateProjectPage />
  </Suspense>
));
