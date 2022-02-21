import React, { useCallback, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import PageTitle from "../../../components/PageTitle";
import Avatar from "react-avatar";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Moment from "moment";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectInvestments } from "../../../redux/actions/project.action";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Investors Bar Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = () => {
  const dispatch = useDispatch();

  const { projectId } = useParams();

  const { projectInvestments } = useSelector(state => state.project);

  const [loading, setLoading] = useState(true);

  const handleProjectInvestments = useCallback(() => {
    dispatch(
      getAllProjectInvestments(projectId, (err, success) => {
        if (success) {
          setLoading(false);
        }
      })
    );
  }, [dispatch, projectId]);

  useEffect(() => {
    handleProjectInvestments();
  }, [handleProjectInvestments]);

  const { name, investments } = projectInvestments;

  const getData = investments => {
    if (!investments) return [];

    if (investments.length === 0) return [];

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let index = 0; index < investments.length; index++) {
      const numMonth = Number(investments[index].createdAt.substring(5, 7) - 1);

      data[numMonth] += investments[index].amount;
    }

    return data;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Investment amount",
        data: getData(investments),
        backgroundColor: "#ED6C03",
      },
    ],
  };

  return (
    <>
      {loading && <Loading height="80vh" />}

      {!loading && (
        <Box>
          <Container maxWidth="xl">
            <Box pb={3} mb={3}>
              {/* Page Title */}
              <PageTitle>{`${name} Dashboard`}</PageTitle>
            </Box>

            <Grid container justifyContent={"space-between"}>
              <Grid item md={7} xs={12}>
                {/* CHART */}
                <Bar options={options} data={data} />
              </Grid>
              <Grid item md={4} xs={12}>
                <Box textAlign={"center"}>
                  <Box mb={2}>
                    <Typography varint="body1" fontWeight={700}>
                      List of Investors
                    </Typography>
                  </Box>

                  <List
                    component={Box}
                    minHeight={"40vh"}
                    border={1}
                    borderColor="#dadada"
                  >
                    {investments.length === 0 && (
                      <Box
                        minHeight={"30vh"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Typography variant="body2" color="warning">
                          Your project has no investors yet.
                        </Typography>
                      </Box>
                    )}

                    {investments.length > 0 &&
                      investments.map((investor, i) => (
                        <ListItem key={investor.id + i}>
                          <ListItemAvatar>
                            <Avatar
                              round
                              src={
                                investor.user.image
                                  ? investor.user.image.url
                                  : ""
                              }
                              name={`${investor.user.firstName} ${investor.user.lastName}`}
                              size="50px"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <span className="capitalize">
                                {`${investor.user.firstName} ${investor.user.lastName}`}
                              </span>
                            }
                            secondary={investor.amount}
                          />
                          <ListItemText
                            secondary={Moment(investor.createdAt).format(
                              "D MMM YYYY"
                            )}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Chart;
