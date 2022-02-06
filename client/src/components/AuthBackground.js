import { Grid } from "@mui/material";
import React from "react";

const AuthBackground = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: "url(/images/bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "left",
      }}
    />
  );
};

export default AuthBackground;
