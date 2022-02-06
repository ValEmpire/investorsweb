import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import { getTheme } from "../theme";
import { Container } from "@mui/material";

const Layout = (props) => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const themeFromCookies = getTheme();

    setTheme(themeFromCookies);
  }, []);

  return (
    <>
      {theme && (
        <ThemeProvider theme={theme}>
          <Navbar setTheme={setTheme} />
          <Box height={"80px"} />
          <Container maxWidth="xl">
            <Box>{props.children}</Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Layout;
