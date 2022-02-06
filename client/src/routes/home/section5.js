// --- Imports --- //
import React from "react";
import ReactDOM from "react-dom";

// --- Material Ui Imports --- //
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@mui/material/Link";

import makeStyles from "@material-ui/core/styles/makeStyles";

// --- Style --- //
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 345,
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    height: 140,
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,.24)",
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h6" paragraph>
        Important Message
      </Typography>
      <Typography variant="caption" paragraph>
        IN MAKING AN INVESTMENT DECISION, INVESTORS MUST RELY ON THEIR OWN
        EXAMINATION OF THE ISSUER AND THE TERMS OF THE OFFERING, INCLUDING THE
        MERITS AND RISKS INVOLVED. INVESTMENTS ON STARTENGINE ARE SPECULATIVE,
        ILLIQUID, AND INVOLVE A HIGH DEGREE OF RISK, INCLUDING THE POSSIBLE LOSS
        OF YOUR ENTIRE INVESTMENT.
      </Typography>
      <Typography variant="caption" paragraph>
        <Link href="#">www.InvestorsWeb.com</Link> is a website owned and
        operated by InvesrtorsWeb Crowdfunding, Inc. (“InvestorsWeb”), which is
        neither a registered broker-dealer, investment advisor nor funding
        portal.
      </Typography>
      <Typography variant="caption" paragraph>
        InvestorsWeb Reg A+ offering is made available through InvestorsWeb
        Crowdfunding, Inc. This investment is speculative, illiquid, and
        involves a high degree of risk, including the possible loss of your
        entire investment. For more information about this offering, please view
        InvestersWeb’s offering circular and risks associated with this
        offering.
      </Typography>
    </Container>
  );
}

export default App;
