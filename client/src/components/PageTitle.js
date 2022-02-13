import React from "react";
import { Box, Typography } from "@mui/material";

const PageTitle = props => {
  return (
    <Box textAlign={"center"} mt={6} pt={5} pb={5}>
      <Typography variant="h4">{props.children}</Typography>
    </Box>
  );
};

export default PageTitle;
