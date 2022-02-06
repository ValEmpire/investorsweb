import { createTheme } from "@mui/material/styles";
import Cookies from "js-cookie";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const setTheme = () => {
  let theme;

  theme = Cookies.get("theme");

  console.log(theme === "dark");

  if (theme !== "light" && theme !== "dark") {
    theme = "light";

    Cookies.set("theme", theme);
  }

  return;
};

export const toggleTheme = () => {
  const theme = Cookies.get("theme");

  if (theme === "dark") {
    Cookies.set("theme", "light");

    return lightTheme;
  }

  Cookies.set("theme", "dark");

  return darkTheme;
};

export const getTheme = () => {
  const theme = Cookies.get("theme");

  if (theme === "light") return lightTheme;

  return darkTheme;
};
