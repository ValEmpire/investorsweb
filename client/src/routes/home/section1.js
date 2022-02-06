import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@material-ui/core/Container";
import Link from "@mui/material/Link";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  fiCardContent: {
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,.24)",
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
});

// const section1 = () => {
//   return (
//     <div>
//       <h1>welcome</h1>

//     <Box sx={{ width: '100%' }}>
//     <LinearProgress />
//   </Box>
//   </div>
//   );
// }

function App() {
  const classes = useStyles();
  const [alignment, setAlignment] = useState("right");

  return (
    <Container className={classes.container}>
      <div className="App">
        <Typography mt={2}>
          <h1>Introducing</h1>
          <h2>InvestorsWeb Collectibles </h2>
          <h3 id="h3" align={alignment}>
            InvestorsWeb Collectibles brings you an opportunity to diversify
            your portfolio.
          </h3>

          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </Typography>
      </div>
    </Container>
  );
}

export default App;
