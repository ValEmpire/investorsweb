import React from "react";
import { Box } from "@mui/material";
import Link from "../../components/Link";

const Website = props => {
  const fakeWebsite = "https://www.yourwebsitehere.com";

  return (
    <Box>
      <Link to={fakeWebsite}>{props.website ?? fakeWebsite}</Link>
    </Box>
  );
};

export default Website;
