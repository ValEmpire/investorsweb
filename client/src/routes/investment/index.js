import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { useParams } from "react-router-dom";
import Amount from "./Amount";
import Payment from "./Payment";
import Review from "./Review";
import { Grid, StepLabel } from "@mui/material";

import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import Message from "./Message";
import NotFound from "../../components/NotFound";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../redux/actions/project.action";

import { findProjectInvestment } from "../../redux/actions/investment.action";

const InvestmentPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const { paymentMethod, isProjectInvested } = useSelector(
    state => state.investment
  );

  const { project } = useSelector(state => state.project);

  const [activeStep, setActiveStep] = useState(0);

  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();

  const handleProject = useCallback(async () => {
    await dispatch(getProject(projectId));

    setLoading(false);
  }, [dispatch, projectId]);

  useEffect(() => {
    handleProject();
  }, [handleProject]);

  const handleStep = i => {
    setActiveStep(i);
  };

  // vars
  const steps = [
    "1. Investment Amount",
    "2. Review",
    !paymentMethod ? "3. Payment" : false,
  ];

  return (
    <>
      {loading && <Loading />}

      {!loading && project && (
        <Box mb={10}>
          <Container maxWidth="lg">
            {/* Page Title */}
            <PageTitle>
              Invest in <b>{`${project.name}`}</b>
            </PageTitle>

            <Grid container justifyContent={"center"}>
              <Grid item md={8} sm={10}>
                {/* If user already invest to this project */}
                <Message />

                {/* else */}
                <Stepper
                  activeStep={activeStep}
                  nonLinear
                  orientation="vertical"
                >
                  {steps.map((label, i) => {
                    return (
                      label && (
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
                                  handleStep={handleStep}
                                  i={i}
                                />
                              )}
                              {activeStep === 1 && (
                                <Review
                                  user={user}
                                  project={project}
                                  handleStep={handleStep}
                                  i={i}
                                />
                              )}
                              {activeStep === 2 && (
                                <Payment
                                  i={i}
                                  handleStep={handleStep}
                                  user={user}
                                  project={project}
                                />
                              )}
                            </Box>
                          </StepContent>
                        </Step>
                      )
                    );
                  })}
                </Stepper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {!loading && !project && <NotFound message={"Project not found"} />}
    </>
  );
};
export default InvestmentPage;
