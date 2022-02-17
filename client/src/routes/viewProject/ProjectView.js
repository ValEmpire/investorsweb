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
import { amountReducer } from "../../helpers/allHelpers";
import { currencyFormat } from "../../helpers/allHelpers";
import { useSelector } from "react-redux";
import Favorite from "../viewProject/Favorite";
import Link from "../../components/Link";

const Info = props => {
  const { isLive, name, value } = props;

  return (
    <Grid item xs={6}>
      <Box p={2}>
        <Typography fontWeight={700} variant="h6">
          {name === "Status" && (
            <>
              {isLive ? (
                <span>{value}</span>
              ) : (
                <span style={{ color: "red" }}>{value}</span>
              )}
            </>
          )}

          {name !== "Status" && value}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {name}
        </Typography>
      </Box>
    </Grid>
  );
};

export default function MediaCard(props) {
  const user = useSelector(state => state.user);

  const project = props.project;

  const daysLeft = function (deadline) {
    if (!deadline) return 0;

    const eventDate = Moment(deadline);

    const todayDate = Moment();

    return eventDate.diff(todayDate, "days");
  };

  const remainingAmount = function () {
    return project.targetFund - project.raisedAmount;
  };

  const infos = [
    {
      isLive: project.isLive,
      name: "Status",
      value: project.isLive ? "Active" : "Draft",
    },
    {
      name: "Location",
      value: project.location ?? "Pending",
    },
    {
      name: "Investors Count",
      value: project.investorCount,
    },
    {
      name: "Target Fund",
      value: amountReducer(project.targetFund ?? "Pending"),
    },
    {
      name: "Minimum Investment",
      value: amountReducer(project.minInvestment),
    },
    {
      name: "Deadline",
      value: project.deadline
        ? Moment(project.deadline).format("ll")
        : "0000-00-00",
    },
    {
      name: "Days left until closing",
      value: daysLeft(project.deadline),
    },
  ];

  return (
    <Container maxWidth="lg" key={project.id}>
      <Grid container spacing={4} mt={10}>
        <Grid item md={8} xs={12}>
          <Card
            sx={{
              border: "none",
              boxShadow: "none",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                image={project.logo ? project.logo.url : "/images/project.png"}
                alt={project.name}
              />
            </Box>
            <Box>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  <b>{project.name ?? "Pending"}</b>
                </Typography>

                {/* {FAVORITE BUTTON} */}
                <Favorite projectId={project.id} project={project} />
              </CardContent>

              <Typography gutterBottom component="div">
                <CardActions>
                  <ProjectTabs project={project} />
                </CardActions>
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Project Counts */}

        <Grid item md={4} xs={12}>
          <Card
            sx={{
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

            <Divider
              variant="full"
              color="#0277bd"
              sx={{ height: 3, marginBottom: 2 }}
            />

            <Grid container>
              {infos.map((info, i) => (
                <Info key={info.name + i} {...info} />
              ))}

              <Grid item xs={12}>
                <Box p={2}>
                  <Typography fontWeight={700} variant="h6">
                    {currencyFormat(Number(remainingAmount()))}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Left to raise expected investment
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {project.owner.id !== user.id && (
              <Box pt={8} pb={3}>
                <Link to={`/investment/${project.id}`}>
                  <Button variant="contained" size="large" fullWidth>
                    Invest Now
                  </Button>
                </Link>
              </Box>
            )}

            {project.owner.id === user.id && (
              <>
                <Box pt={8} pb={2}>
                  <Link to={`/projects/dashboard/${project.id}/update`}>
                    <Button variant="contained" size="large" fullWidth>
                      Update Project
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    color="warning"
                    fullWidth
                  >
                    Delete Project
                  </Button>
                </Box>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
