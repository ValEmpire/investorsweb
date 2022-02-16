// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const Slider = () => {
//   return (
//     <Box pt={6} pb={6}>
//       <Grid container alignItems="center" justifyContent="center">
//         <Grid item md={6} sm={8} xs={12}>
//           <Carousel showThumbs={false}>
//             <div>
//               <img src="/images/market1.jpeg" alt="image1" />
//             </div>
//             <div>
//               <img src="/images/market2.jpeg" alt="image2" />
//             </div>
//             <div>
//               <img src="/images/market3.jpeg" alt="image3" />
//             </div>
//           </Carousel>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Slider;
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Grid from "@mui/material/Grid";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: "images/market4.jpg",
  },
  {
    imgPath: "images/market2.jpg",
  },
  {
    imgPath: "images/market3.jpg",
  },
  {
    imgPath:
      "images/market1.jpg",
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box pt={6} pb={12}  sx={{ width: 1, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 7,
          pb: 7,
          bgcolor: "background.default",
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 500,
                  display: "block",
                  width: 1,
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
          
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
         
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
