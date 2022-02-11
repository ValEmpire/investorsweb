import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Amount from "./Amount";
import Payment from "./Payment";
import Review from "./Review";

//REDUX
import { useDispatch } from "react-redux";
import { submitInvestment } from "../../redux/actions/investment.action";
import { createPaymentIntent } from "../../redux/actions/stripe.action";

const ProjectViewPage = () => {
  // hooks
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // states
  const [project, setProject] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState("");

  const getProject = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/project/${projectId}`,
      {
        withCredentials: true,
      }
    );

    setProject(res.data.project);

    return;
  };

  useEffect(() => {
    getProject();
  }, []);

  // handlers
  const handleAmount = e => {
    setAmount(e.target.value);

    return;
  };

  const handleNext = async () => {
    try {
      // if active step is zero send payment intent
      if (activeStep === 0) {
        await dispatch(createPaymentIntent(amount, project.owner.stripeId));

        setActiveStep(activeStep + 1);
      }

      // if (activeStep === steps.length - 1) {
      //   dispatch(submitInvestment({ amount, projectId }, err => {}));
      //   setActiveStep(activeStep + 1);
      // } else {
      //   setActiveStep(activeStep + 1);
      // }
    } catch (err) {
      // handle error here
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // vars
  const steps = ["1. Investment Amount", "2. Payment", "3. Review"];

  return (
    <Box mt={2} pt={3}>
      <Container maxWidth="md">
        <Box pb={3} textAlign="center">
          <Typography variant="h4">
            Invest in <b>{project.name}</b>
          </Typography>
        </Box>
        <div>
          <Paper component={Box} p={3}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, i) => {
                return (
                  <Step key={label + i}>
                    <StepLabel>
                      <Typography variant="h6" fontWeight={700}>
                        {label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box pt={2} pb={2}>
                        {activeStep === 0 && (
                          <Amount
                            project={project}
                            amount={amount}
                            handleAmount={handleAmount}
                          />
                        )}
                        {activeStep === 1 && <Payment />}
                        {activeStep === 2 && <Review amount={amount} />}
                      </Box>
                      <div>
                        <div>
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 2, width: "35ch" },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              Back
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                            >
                              {activeStep === steps.length - 1
                                ? "Complete Investment"
                                : "Continue"}
                            </Button>
                          </Box>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </Paper>
          {activeStep === steps.length && (
            <Paper square elevation={0}>
              <Typography variant="h6" component="h6">
                Thanks for investing with us.
              </Typography>
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </Container>
    </Box>
  );
};
export default ProjectViewPage;
