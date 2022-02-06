import React, { Suspense } from "react";
import PublicRoute from "../HOCs/public";
import CircularProgress from "@mui/material/CircularProgress";

const BlogPage = React.lazy(() => import("../routes/blog"));

export default PublicRoute(() => (
  <Suspense fallback={<CircularProgress />}>
    <BlogPage />
  </Suspense>
));
