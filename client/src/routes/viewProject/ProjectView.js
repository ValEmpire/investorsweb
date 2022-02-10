import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import ProjectTabs from "./ProjectTabs";
import Moment from "moment";
import { amountReducer } from "../../helpers/amountReducer";
import { currencyFormat } from "../../helpers/amountReducer";
import { useSelector } from "react-redux";

export default function MediaCard(props) {
  const user = useSelector(state => state.user);
  const project = props.project;

  const daysLeft = function () {
    const eventDate = Moment(project.deadline);
    const todayDate = Moment();
    return eventDate.diff(todayDate, "days");
  };

  const remainingAmount = function () {
    return project.targetFund - project.raisedAmount;
  };

  return (
    <Container maxWidth="lg" key={project.id}>
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
                image={project.logo ? project.logo.url : null}
                alt={project.name}
              />
            </Box>
            <Box>
              <Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <b>{project.name}</b>
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
                >
                  <ProjectTabs />
                </CardActions>
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Project Counts */}

        <Grid item md={4} xs={12}>
          <Card
            sx={{
              pb: 4,
              border: "none",
              boxShadow: "none",
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ paddingRight: 2, pb: 1 }} variant="h4">
                <b>{`${currencyFormat(Number(project.raisedAmount))}`}</b>
              </Typography>
              Raised
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
                  {project.isLive ? "Active" : "Pending"}
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
                  {project.location}
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
                  {project.investorCount}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Investors
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
                  ${amountReducer(project.targetFund)}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Target Funf
                  {/*{insesrors_count} */}
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
                    fontSize: 20,
                  }}
                >
                  {amountReducer(project.minInvestment)}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Min.Investment
                  {/*{insesrors_count} */}
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
                  {Moment(project.deadline).format("ll")}
                </Typography>
                <Typography sx={{ color: "#424242", fontSize: 15 }}>
                  Deadline
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
                  {daysLeft()}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Days left until closing
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
                  {currencyFormat(Number(remainingAmount()))}
                </Typography>
                <Typography sx={{ color: "#424242", mx: 4, fontSize: 15 }}>
                  Left to raise expected investment
                  {/*{insesrors_count} */}
                </Typography>
              </Box>
            </Box>
            <Box
              mt={12}
              pb={3}
              key={project.id}
              display={project.owner.id === user.id ? "none" : ""}
            >
              <Button
                href={"/investment/" + project.id}
                variant="contained"
                size="large"
                fullWidth
              >
                Invest Now
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
