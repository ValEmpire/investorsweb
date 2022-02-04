import React from "react";
import Box from "@mui/material/Box";
import NavPage from "./navbar";

const Layout = (props) => {
  return (
    <>
      <NavPage />
      <Box>{props.children}</Box>
    </>
  );
};

export default Layout;
