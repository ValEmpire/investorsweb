import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Redux
import { useSelector } from "react-redux";

export default function Preview() {
  const { projectFields } = useSelector(state => state.project);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Project Preview
      </Typography>
      <List disablePadding>
        {Object.keys(projectFields).map(key => (
          <ListItem key={key} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={key} />
            <Typography variant="body2">{projectFields[key]}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
