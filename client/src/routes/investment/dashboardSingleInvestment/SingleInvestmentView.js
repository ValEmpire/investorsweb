import * as React from "react";
import { CardContent, Container, Grid, Link } from "@mui/material";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { currencyFormat } from "../../../helpers/allHelpers";
import Moment from "moment";
import ProjectImage from "./ProjectImage";
import CustomLink from "../../../components/Link";

export default function SingleInvestmentView(props) {
  const investment = props.investment;

  const remainingAmount = function () {
    return investment.project.targetFund - investment.project.raisedAmount;
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} mt={10}>
        <Grid item md={8} xs={12}>
          <ProjectImage investment={investment} />

          <Box textAlign={"center"} pt={1} mt={1}>
            <CardContent>
              <CustomLink
                to={`/projects/${investment.project.id}`}
                color="secondary"
              >
                <Link
                  fontWeight={700}
                  variant="h5"
                  color="primary"
                  underline="none"
                >
                  {investment.project.name}
                </Link>
              </CustomLink>
            </CardContent>
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography
                color="primary"
                sx={{ paddingRight: 2, pb: 1 }}
                variant="h4"
              >
                <b>{`${currencyFormat(Number(investment.amount))}`}</b>
              </Typography>
              Invested
            </Box>
            <Box pb={1} mb={1}>
              <Typography>
                <span className="bold">
                  {Moment(investment.createdAt).format("D-MMM-YYYY")}{" "}
                </span>
                <span>Date of investment</span>
              </Typography>
            </Box>

            <Divider variant="full" color="#1876D2" sx={{ height: 3 }} />

            <Box pb={1} mt={4} textAlign="center">
              <Typography variant="h6" fontWeight={700}>
                Contact Details
              </Typography>
            </Box>

            <Card component={Box} p={2} mt={4}>
              <Box display="flex" mb={2} alignItems="center">
                <Box mr={2}>
                  <Avatar
                    alt={investment.project.name}
                    src={
                      investment.project.owner.image
                        ? investment.project.owner.image.url
                        : null
                    }
                    sx={{ width: 75, height: 75 }}
                  />
                </Box>
                <Box>
                  <Typography fontWeight={700} variant="h6">
                    <span className="capitalize">{`${investment.project.owner.firstName} ${investment.project.owner.lastName}`}</span>
                  </Typography>
                  <Typography variant="body2">
                    {investment.project.owner.userDetail.phoneNumber}
                  </Typography>
                  <Typography variant="body2">
                    {investment.project.owner.email}
                  </Typography>
                </Box>
              </Box>

              <Box mt={1} mb={1} pt={1}>
                <Typography variant="body1">
                  Location :{" "}
                  <span className="bold capitalize">
                    {investment.project.location}
                  </span>{" "}
                </Typography>
              </Box>

              <Box mt={1} mb={1} pt={1}>
                <Typography variant="body1">
                  Created on :{" "}
                  <span className="bold">{`${Moment(
                    investment.project.createdAt
                  ).format("D MMM YYYY")}`}</span>
                </Typography>
              </Box>

              <Box mt={1} mb={1} pt={1}>
                <Typography variant="body1">
                  Website :{" "}
                  <Link href={investment.project.website}>
                    <span className="bold">{investment.project.website}</span>
                  </Link>
                </Typography>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
