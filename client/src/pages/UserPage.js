import React, { Suspense } from "react";
import Wrapper from "../HOCs/wrapper";
import CircularProgress from "@mui/material/CircularProgress";

const UserPage = React.lazy(() => import("../routes/user"));

export default Wrapper(() => (
  <Suspense fallback={<CircularProgress />}>
    <UserPage />
  </Suspense>
));
