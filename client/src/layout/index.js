import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import Footer from "./footer";
import { getTheme } from "../theme";
import Alert from "../components/Alert";

const Layout = props => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const themeFromCookies = getTheme();

    setTheme(themeFromCookies);
  }, []);

  return (
    <>
      {theme && (
        <ThemeProvider theme={theme}>
          <Box minHeight={"100vh"}>
            <Navbar setTheme={setTheme} />
            <Box height={"69px"} />
            {props.children}

            {/* This is our alert. this is going to display messages if error is found in redux store */}
            <Alert />
          </Box>
          <Footer />
        </ThemeProvider>
      )}
    </>
  );
};

export default Layout;
