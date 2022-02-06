import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box ><b>About</b></Box>
              <Box>
                <Link href="/" color="inherit">
                Our Team
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Equity Crowdfunding 101
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Blog
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box ><b>Companies</b></Box>
              <Box>
                <Link href="/" color="inherit">
                  Raise Capital
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Why InvestorsWeb
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Refer Founders
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box ><b>Investors</b></Box>
              <Box>
                <Link href="/" color="inherit">
                 Start Investing
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                 How Investing Works
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                 Investor FAQ
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            InvestorsWeb &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}