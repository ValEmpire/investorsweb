import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectDetails from "./ProjectDetails";
import CreateStory from "./CreateStory";
import Preview from "./Preview";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { submitProject } from "../../../redux/actions/project.action";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {/* {"Back to your Dashboard "} */}
      <Link color="inherit" href="/projects">
        Back to your Dashboard
      </Link>{" "}
      {/* {new Date().getFullYear()} */}
      {"."}
    </Typography>
  );
}

const steps = ["Project information", "Create story", "Preview project"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProjectDetails />;
    case 1:
      return <CreateStory />;
    case 2:
      return <Preview />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function CreateProjectPage() {
  const project = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      dispatch(submitProject(project, (err) => {}));
      // if successfull
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create Project
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your project was successfuly submitted.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Submit Project"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
