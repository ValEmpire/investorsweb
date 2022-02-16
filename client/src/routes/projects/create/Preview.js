import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Redux
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export default function Preview() {
  const { projectFields } = useSelector(state => state.project);

  return (
    <>
      <Box pb={1}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Preview
        </Typography>
      </Box>
      <List disablePadding>
        {Object.keys(projectFields).map(key => (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={key} />
            <Typography variant="body2">{projectFields[key]}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
