import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./navbar";
import Footer from "./footer";
import { getTheme } from "../theme";
import Alert from "../components/Alert";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setWindowWidth } from "../redux/actions/layout.action";

const Layout = props => {
  const [theme, setTheme] = useState();

  const { width } = useSelector(state => state.layout);

  const dispatch = useDispatch();

  const handleWindowWidth = useCallback(() => {
    const width = window.innerWidth;

    dispatch(setWindowWidth(width));
  }, [dispatch]);

  useEffect(() => {
    const themeFromCookies = getTheme();

    setTheme(themeFromCookies);

    window.addEventListener("resize", e => {
      handleWindowWidth();
    });
  }, [handleWindowWidth]);

  return (
    <>
      {theme && (
        <ThemeProvider theme={theme}>
          <Box minHeight={"100vh"}>
            <Navbar setTheme={setTheme} />
            <Box
              height={"69px"}
              sx={{
                backgroundColor: "#F9f9fb",
              }}
            />
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
