import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

// Tabs
import Security from "./Security";
import Details from "./Details";
import Billings from "./Billings";
import { Button } from "@mui/material";
import UpdateDetails from "./UpdateDetails";
import UpdateSecurity from "./UpdateSecurity";

// Redux
import { useSelector } from "react-redux";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.user);

  return (
    <Container component="main" maxWidth="md">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h3" align="center">
          Your Account
        </Typography>
        <Box sx={{ width: "100%" }} pt={2} pb={2}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Security" {...a11yProps(1)} />
              <Tab label="Billings" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Details user={user} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Security user={user} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Billings user={user} />
          </TabPanel>
        </Box>
        <Box textAlign="center" pb={2}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Update
          </Button>

          {value === 0 && (
            <UpdateDetails open={open} user={user} handleClose={handleClose} />
          )}
          {value === 1 && (
            <UpdateSecurity open={open} handleClose={handleClose} />
          )}
        </Box>
      </Paper>
    </Container>
  );
}
