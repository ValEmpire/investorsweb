import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Container } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export default function InvestmentsDashboard(props) {
  // console.log(props);
  return (
    <Container xs={12} md={8} sx={{}}>
      <Grid container xs={12} md={12}>
        {items.map(item => (
          <Grid
            container
            mt={10}
            spacing={4}
            key={item}
            sx={{
              ml: 0,
              border: 1,
              justifyContent: "space-around",
              boxShadow: 1,
              bgcolor: "background.paper",
            }}
          >
            <Grid item sx={{ mb: 6, mr: 10 }}>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img
                  alt="complex"
                  src="https://digital.hammacher.com/Items/87588/87588A_1000x1000.jpg"
                />
              </ButtonBase>
            </Grid>

            <Grid
              item
              container
              xs={8}
              md={8}
              spacing={12}
              sx={{ mb: 4, justifyContent: "center" }}
            >
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Project Name
                  </Typography>
                  <Typography variant="body2" gutterBottom></Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Of Invecting
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Your Invest $
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Your Invest $
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Project Name
                  </Typography>
                  <Typography variant="body2" gutterBottom></Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Of Invecting
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Your Invest $
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Your Invest $
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Project Name
                  </Typography>
                  <Typography variant="body2" gutterBottom></Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date Of Invecting
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Your Invest $
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    Your Invest $
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
