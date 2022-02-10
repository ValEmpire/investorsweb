import React from "react";
import Head from "./Head";
import Mission from "./Mission";
import Team from "./Team";
import { Divider } from "@mui/material";

const About = () => {
  return (
    <>
      <Head />
      <Team />
      <Divider />
      <Mission />
      <Divider />
    </>
  );
};

export default About;
