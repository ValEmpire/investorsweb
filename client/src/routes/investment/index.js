import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepContent from "@mui/material/StepContent";
import { useParams } from "react-router-dom";
import Amount from "./Amount";
import Payment from "./Payment";
import Review from "./Review";

//REDUX
import { useSelector } from "react-redux";

import { Grid, StepLabel } from "@mui/material";

const InvestmentPage = () => {
  // hooks
  const user = useSelector(state => state.user);
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

  const handleStep = i => {
    setActiveStep(i);
  };

  // vars
  const steps = ["1. Investment Amount", "2. Review", "3. Payment"];

  return (
    <Box mt={2} pt={3} mb={10}>
      <Container maxWidth="lg">
        <Box pb={3} textAlign="center">
          <Typography variant="h4">
            Invest in <b>{project.name}</b>
          </Typography>
        </Box>
        <Grid container justifyContent={"center"}>
          <Grid item md={8} sm={10}>
            <Stepper activeStep={activeStep} nonLinear orientation="vertical">
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
                            handleStep={handleStep}
                            i={i}
                          />
                        )}
                        {activeStep === 1 && (
                          <Review
                            user={user}
                            amount={amount}
                            project={project}
                            handleStep={handleStep}
                            i={i}
                          />
                        )}
                        {activeStep === 2 && (
                          <Payment i={i} handleStep={handleStep} user={user} />
                        )}
                      </Box>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default InvestmentPage;
