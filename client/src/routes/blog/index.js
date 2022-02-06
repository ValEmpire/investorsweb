import {
  CircularProgress,
  LinearProgress,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
    linearProgress: {
      width: theme.spacing(30),
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress className={classes.linearProgress} />
      
    </div>
  );
}

export default App;