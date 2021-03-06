import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "../../components/Link";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        backgroundColor="#eeeeee"
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent={"center"}>
              <Grid item md={4} xs={12}>
                <Box pb={2}>
                  <b>About</b>
                </Box>
                <Box pb={1}>
                  <Link to="/" color="inherit">
                    Our Team
                  </Link>
                </Box>
                <Box pb={1}>
                  <Link to="/" color="inherit">
                    Equity Crowdfunding 101
                  </Link>
                </Box>
                <Box>
                  <Link to="/" color="inherit">
                    Blog
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent={"center"}>
              <Grid item md={4} xs={12}>
                <Box pb={2}>
                  <b>Companies</b>
                </Box>
                <Box pb={1}>
                  <Link to="/" color="inherit">
                    Raise Capital
                  </Link>
                </Box>
                <Box pb={1}>
                  <Link to="/" color="inherit">
                    Why InvestorsWeb
                  </Link>
                </Box>
                <Box>
                  <Link to="/" color="inherit">
                    Refer Founders
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent={"center"}>
              <Grid item md={4} xs={12}>
                <Box pb={2}>
                  <b>Investors</b>
                </Box>
                <Box pb={1}>
                  <Link to="/" color="inherit">
                    Start Investing
                  </Link>
                </Box>
                <Box pb={1}>
                  <Link to="/" color="inherit">
                    How Investing Works
                  </Link>
                </Box>
                <Box>
                  <Link to="/" color="inherit">
                    Investor FAQ
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          InvestorsWeb &reg; {new Date().getFullYear()}
        </Box>
      </Box>
    </footer>
  );
}
