import React from "react";
import {
  Card,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "moment";
import { amountReducer, currencyFormat } from "../../../helpers/allHelpers";

const InvestmentCard = props => {
  const { investment } = props;
  const { project } = investment;
  const to = props.to;

  const where = to === "dashboard" ? `/projects/${to}` : `/${to}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link className="link" to={`${where}/${project.id}`}>
        <Card>
          <CardMedia
            height={300}
            component="img"
            image={project.logo ? project.logo.url : "/images/project.png"}
            alt={project.id}
          />
          <Box>
            <Box textAlign="center" pt={2} mt={1} pb={2}>
              {project.isLive && (
                <Typography
                  className="capitalize"
                  gutterBottom
                  noWrap
                  variant="h5"
                  color="primary"
                >
                  <strong>{project.name || "new project"}</strong>
                </Typography>
              )}
              {!project.isLive && (
                <Typography
                  className="capitalize"
                  gutterBottom
                  noWrap
                  variant="h5"
                  color="red"
                >
                  <strong>{"new project"}</strong>
                </Typography>
              )}
            </Box>

            <Box pb={3} pl={2} pr={2}>
              <Box pb={1}>
                <Typography>
                  Invested Date:{" "}
                  <strong>
                    {Moment(investment.createdAt).format("D MMM YYYY")}
                  </strong>
                </Typography>
              </Box>
              <Box pb={1}>
                <Typography>
                  Invested Amount:{" "}
                  <strong>{currencyFormat(investment.amount)}</strong>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Link>
    </Grid>
  );
};

export default InvestmentCard;
