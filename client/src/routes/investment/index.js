import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
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
import { useDispatch, useSelector } from "react-redux";
import { submitInvestment } from "../../redux/actions/investment.action";

const ProjectViewPage = () => {
  const investment = useSelector(state => state.investment);

  const dispatch = useDispatch();

  const [project, setProject] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [amount, setAmount] = useState("");

  const { projectId } = useParams();

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

  const handleAmount = e => {
    setAmount(e.target.value);
    return;
  };

  useEffect(() => {
    getProject();
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      dispatch(submitInvestment({ amount, projectId }, err => {}));
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = ["1. Investment Amount", "2. Payment", "3. Review"];

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ m: 2 }}>
          <Typography variant="h3">
            Invest in <b>{project.name}</b>
          </Typography>
        </Box>
        <Divider variant="middle" />
        <div>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              console.log("steps---->", steps);
              console.log("label---->", label);
              console.log("index---->", index);

              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Box>
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
