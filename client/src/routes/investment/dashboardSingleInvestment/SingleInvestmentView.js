import * as React from "react";
import { Container, Grid, Link } from "@mui/material";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {
  currencyFormat,
  capitalizeFirstLetter,
} from "../../../helpers/allHelpers";
import Moment from "moment";

export default function SingleInvestmentView(props) {
  const investment = props.investment;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} mt={10}>
        <Grid item md={8} xs={12}>
          <Card
            md={8}
            xs={12}
            sx={{
              border: "none",
              boxShadow: "none",
            }}
          >
            <Box>
              <CardMedia
                sx={{
                  height: "100%",
                }}
                component="img"
                image={
                  investment.project.logo ? investment.project.logo.url : null
                }
                alt={investment.project.name}
              />
            </Box>
            <Box>
              <Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <b>{investment.project.name}</b>
                  </Typography>
                </CardContent>
              </Box>
              <Typography gutterBottom component="div">
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    color: "#212121",
                  }}
                ></CardActions>
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item md={4} xs={12}>
          <Card
            sx={{
              pb: 4,
              border: "none",
              boxShadow: "none",
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <b>{` Project ${investment.project.name} was created by
              ${capitalizeFirstLetter(investment.project.owner.firstName)}
             ${capitalizeFirstLetter(
               investment.project.owner.lastName
             )} on ${Moment(investment.project.createdAt).format(
                "D MMM YYYY"
              )}`}</b>
              <div>
                <Avatar
                  alt={investment.project.name}
                  src={
                    investment.project.owner.image
                      ? investment.project.owner.image.url
                      : null
                  }
                  sx={{ width: 100, height: 100 }}
                />
              </div>
            </Box>
            <Divider variant="full" color="#0277bd" sx={{ height: 3 }} />

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 20,
                  }}
                >
                  {investment.project.isLive ? "Active" : "Pending"}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Status
                  {/*{insesrors_count} */}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 20,
                  }}
                >
                  {investment.project.location}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Location
                  {/*{insesrors_count} */}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 20,
                  }}
                >
                  {currencyFormat(Number(investment.amount))}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Your Investment
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 20,
                  }}
                ></Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  {/* Target Funf */}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 5,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 15,
                  }}
                >
                  <Link href={"/" + investment.project.website}>
                    {investment.project.website}
                  </Link>
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Project website
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    ml: 0,
                    fontSize: 20,
                  }}
                >
                  {/* {Moment(project.deadline).format("ll")} */}
                </Typography>
                <Typography sx={{ color: "#424242", fontSize: 15 }}>
                  {/* Deadline */}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 15,
                  }}
                >
                  {investment.project.owner.email}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  E-mail us
                  {/*{insesrors_count} */}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 20,
                  }}
                >
                  {/* {currencyFormat(Number(remainingAmount()))} */}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Left to raise expected investment
                  {/*{insesrors_count} */}
                </Typography>
              </Box>
            </Box>
            <Box mt={12} pb={3}>
              <Button
                href={"/investment/" + investment.id}
                variant="contained"
                size="large"
                fullWidth
              >
                Add Investment
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* NEXT iNFO */}
      <Box
        item
        xs={12}
        md={12}
        sx={{
          mb: 4,
          border: "none",
          boxShadow: "none",
          height: "100%",
        }}
      >
        <Grid item md={8} xs={12} sx={{ display: "flex" }}>
          <Card md={8} xs={12}>
            <Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography
                  sx={{ pl: 1, pr: 1, pt: 1, pb: 1 }}
                  variant="h4"
                ></Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#212121",
                    mx: 4,
                    fontSize: 16,
                  }}
                >
                  Project: {investment.project.story}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {/* <b>{investment.project.name}</b> */}
                  </Typography>
                </CardContent>
              </Box>
              <Typography gutterBottom component="div">
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    color: "#212121",
                  }}
                ></CardActions>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
}
