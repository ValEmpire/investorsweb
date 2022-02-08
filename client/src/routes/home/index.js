import React from "react";
import Jumbotron from "./Jumbotron";
import Count from "./Count";
import Featured  from "./Featured";
import Slider from "./Slider";
import { Divider } from "@mui/material";
i

const Home = () => {
  return (
    <>
      <Jumbotron />
      <Divider />
      <Count />
      <Featured />
      <Divider />
      <Slider />
     
    </>
  );
};

export default Home;