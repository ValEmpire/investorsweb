import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Story from "./Story";

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

export default function ProjectTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 480, bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Story" />
        <Tab label="Website" />
        <Tab label="Comments" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Story />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <Website /> */}
        Put the website link here.
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <Comments /> */}
        Fetch all the project comments here.
      </TabPanel>
    </Box>
  );
}
