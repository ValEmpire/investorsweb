import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

// Tabs
import Security from "./Security";
import Details from "./Details";
import PaymentMethod from "./PaymentMethod";
import CompanyAccount from "./CompanyAccount";
// Modal
import UpdateDetails from "./UpdateDetails";
import UpdateSecurity from "./UpdateSecurity";
import AddCard from "./AddCard";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";

// CSS
import "react-credit-cards/es/styles-compiled.css";
import { generateLink } from "../../redux/actions/stripe.action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserPage() {
  const user = useSelector(state => state.user);

  const [companyLoading, setCompanyLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { account } = useSelector(state => state.stripe);

  const { payouts_enabled } = account;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const stripe_success = searchParams.get("stripe_success");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    // if in company account tab
    if (value === 2) {
      setCompanyLoading(true);

      dispatch(
        generateLink(payouts_enabled, (err, link) => {
          window.open(link, "_blank");

          return;
        })
      );

      return;
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (stripe_success) {
      setValue(2);

      dispatch(
        setAlert({
          open: true,
          message: "Stripe account created successfully.",
          type: "success",
        })
      );
    }
  }, [stripe_success, dispatch, searchParams]);

  return (
    <Container component="main" maxWidth="md">
      <Paper
        variant="outlined"
        component={Box}
        mt={5}
        pt={6}
        pl={2}
        pr={2}
        pb={5}
      >
        <Typography variant="h4" align="center">
          Your Account
        </Typography>
        <Box sx={{ width: "100%" }} pt={2} pb={2}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="scrollable"
              allowScrollButtonsMobile
              value={value}
              onChange={handleChange}
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Security" {...a11yProps(1)} />
              <Tab label="Company Account" {...a11yProps(2)} />
              <Tab label="Payment Method" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Details user={user} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Security user={user} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CompanyAccount
              setCompanyLoading={setCompanyLoading}
              account={account}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PaymentMethod user={user} />
          </TabPanel>
        </Box>
        <Box textAlign="center" pb={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={
              value === 2 && companyLoading
                ? true
                : value === 2 && payouts_enabled
            }
            onClick={handleOpen}
          >
            {value === 0 && "Update Details"}
            {value === 1 && "Update Security"}
            {value === 2 && "Add Company Account"}
            {value === 3 && "Add Card"}
          </Button>

          {value === 0 && (
            <UpdateDetails open={open} user={user} handleClose={handleClose} />
          )}
          {value === 1 && (
            <UpdateSecurity open={open} user={user} handleClose={handleClose} />
          )}
          {value === 3 && <AddCard open={open} handleClose={handleClose} />}
        </Box>
      </Paper>
    </Container>
  );
}
