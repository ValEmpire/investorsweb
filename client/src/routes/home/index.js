import React from "react";
import Jumbotron from "./Jumbotron";
import Count from "./Count";
import Slider from "./Slider";
import { Divider } from "@mui/material";

const Home = () => {
  return (
    <>
      <Jumbotron />
      <Divider />
      <Count />
      <Divider />
      <Slider />
    </>
  );
};

export default Home;
