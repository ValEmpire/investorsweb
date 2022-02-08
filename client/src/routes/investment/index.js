import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";

import {
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";

const styles = (theme) => ({
  root: {
    width: "90%",
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ["1. Investment Amount", "2 .Verification", "3. Review"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              <b>Amount</b>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
            <FormHelperText id="filled-weight-helper-text">
              Your investment amount will be rounded up to be a multiple of the
              share price. The minimum investment in this offering is $255.68.
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              <b>Annual Income</b>{" "}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$0.00</InputAdornment>
              }
              label="Annual Income"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              <b>Net Worth</b>
              <Tooltip title="Calculating net worth involves adding up all your assets and subtracting all your liabilities.The result sum is your net worth.">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$0.00</InputAdornment>
              }
              label="Net Worth"
            />

            <FormHelperText id="filled-weight-helper-text">
              This information is used to calculate your investment limits for
              crowdfunding.
            </FormHelperText>
          </FormControl>
        </>
      );
    case 1:
      return (
        <>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Citizenship
            </FormLabel>
            <br />
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="I am a US Citizen or US Legal Resident"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="I am not a US Citizen or US Legal Resident"
              />
            </RadioGroup>
          </FormControl>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Government Issued Identification Number"
              focused
            />
          </Box>
        </>
      );

    case 2:
      return (
        <>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                This Project is the part of our Finals in LightouseLabs as a
                Full Stack Developer.This is for demo purpose only.
              </Typography>
            </CardContent>
          </Card>
        </>
      );

    default:
      return `Thanks for Investing with us`;
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Box className={classes.jumbotronWrapper}>
        <Container maxWidth="lg">
          <Box sx={{ m: 2 }}>
            <Typography variant="h3">
              Invest in <b>Monogram Orthopaedics</b>
            </Typography>
            <Typography variant="h8" color="primary">
              <b>$7.52 Per Share</b>
            </Typography>
          </Box>
          <Divider variant="middle" />
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                console.log("steps---->", steps);
                console.log("label---->", label);
                console.log("index---->", index);

                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{getStepContent(index)}</Typography>
                      <div className={classes.actionsContainer}>
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
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleNext}
                              className={classes.button}
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
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography variant="h6" component="h6">
                  Thanks for investing with us.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={this.handleReset}
                  className={classes.button}
                >
                  Reset
                </Button>
              </Paper>
            )}
          </div>
        </Container>
      </Box>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
