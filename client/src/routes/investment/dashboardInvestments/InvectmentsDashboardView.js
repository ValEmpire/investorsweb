import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box } from "@mui/system";
import { currencyFormat } from "../../../helpers/amountReducer";
import Moment from "moment";
import { Link } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function InvestmentsDashboard(props) {
  const investments = props.investments;
  console.log(props);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", ml: 1, mr: 3 }}
      mb={{ display: "flex", justifyContent: "center", ml: 1, mr: 3 }}
    >
      <Grid xs={12} md={5}>
        {investments.map(investment => (
          <Link href={"/user/dashboard/" + investment.id} underline="none">
            <Grid
              container
              mt={5}
              mb={5}
              spacing={2}
              key={investment.id}
              sx={{
                ml: 0,
                border: 1,
                justifyContent: "space-around",
                boxShadow: 1,
                bgcolor: "background.paper",
              }}
            >
              <Box sx={{ mt: 3 }}>
                <Grid>
                  <ButtonBase
                    sx={{
                      width: 180,
                      height: 180,
                    }}
                  >
                    <Img
                      key={investment.id}
                      alt={investment.project.name}
                      src={
                        investment.project.logo
                          ? investment.project.logo.url
                          : null
                      }
                      loading="lazy"
                    />
                  </ButtonBase>
                </Grid>
              </Box>
              <Box item container xs={8} md={8} spacing={12} sx={{ mb: 4 }}>
                <Grid>
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    wrap="nowrap"
                    spacing={4}
                    display="inline"
                  >
                    <Grid item xs>
                      <Box>
                        <Typography sx={{ display: "inline" }}>
                          <b>{investment.project.name}</b>
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item>
                      <Typography variant="body2">
                        Your Invest:{" "}
                        <b>{currencyFormat(Number(investment.amount))}</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        Date: <b>{Moment(investment.createdAt).format("ll")}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}
