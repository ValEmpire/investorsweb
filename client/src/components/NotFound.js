import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Link from "./Link";

const NotFound = props => {
  const { message } = props;

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      minHeight={"80vh"}
    >
      <Grid item md={6} sm={8}>
        <Box textAlign={"center"}>
          <Typography variant="h2">Error code 404</Typography>

          <Typography variant="h4">{message}</Typography>

          <Box pt={1} mt={1}>
            <Link to="/">
              <Typography>Back to Home</Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotFound;
