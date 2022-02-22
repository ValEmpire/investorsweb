import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Story from "./Story";
import Website from "./Website";
import Comment from "./Comment";
import { Grid } from "@mui/material";

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

export default function ProjectTabs(props) {
  const [value, setValue] = React.useState(0);
  const { project, user } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width="100%">
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Story" />
        <Tab label="Website" />
        {user.id && <Tab label="Comments" />}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Story project={project} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Website website={project.website} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Comment />
      </TabPanel>
    </Box>
  );
}
