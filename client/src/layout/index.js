import React from "react";
import Box from "@mui/material/Box";

const Layout = (props) => {
  return (
<>
    < navbar />
    // sidebar
    <Box>{props.children}</Box>
    </>
  );
};

export default Layout;
