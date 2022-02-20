import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Loading from "../../../components/Loading";
import InvestmentCard from "./InvestmentCard";
import PageTitle from "../../../components/PageTitle";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUserInvestments } from "../../../redux/actions/investment.action";

const ProjectDashboardPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInvestments } = useSelector(state => state.investment);

  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("Recently");

  const handleUserInvestments = useCallback(() => {
    dispatch(
      getAllUserInvestments((err, success) => {
        if (success) {
          setLoading(false);
        }

        return;
      })
    );

    return;
  }, [dispatch]);

  const handleFilterChange = e => {
    const val = e.target.value;

    setSort(val);
  };

  useEffect(() => {
    handleUserInvestments();
  }, [handleUserInvestments]);

  return (
    <Container maxWidth="lg" component={Box} pb={2} mb={2}>
      <Box pb={2} mb={1}>
        <Box pb={6} textAlign="center">
          <PageTitle>My Investments Dashboard</PageTitle>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            You have invested in the <b>{userInvestments.length}</b> following
            projects
          </Typography>

          <Box pt={2} mt={2}>
            <Button onClick={() => navigate("/explore")} variant="contained">
              Explore Investments
            </Button>
          </Box>
        </Box>

        <Grid container justifyContent={"right"}>
          <Grid item md={3} sm={4} xs={8}>
            <FormControl disabled={userInvestments.length === 0} fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select value={sort} label="Sort" onChange={handleFilterChange}>
                <MenuItem value={"Recently"}>Recently Investment</MenuItem>
                <MenuItem value={"Oldest"}>Oldest Investment</MenuItem>
                <MenuItem value={"Largest"}>Largest Investment</MenuItem>
                <MenuItem value={"Smallest"}> Smallest Investment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading && <Loading height={400} />}

      {!loading && userInvestments.length > 0 && (
        <Grid container spacing={4}>
          {userInvestments
            .sort((a, b) => {
              switch (sort) {
                case "Recently":
                  return b.id - a.id;

                case "Oldest":
                  return a.id - b.id;

                case "Largest":
                  return b.amount - a.amount;

                case "Smallest":
                  return a.amount - b.amount;

                default:
                  return 0;
              }
            })
            .map((investment, i) => (
              <InvestmentCard
                key={investment.createdAt + i}
                investment={investment}
              />
            ))}
        </Grid>
      )}

      {!loading && userInvestments.length === 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6">
                You have no investment. Please explore investments to start
                funding.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProjectDashboardPage;
