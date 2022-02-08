import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Avatar from "react-avatar";

const Details = props => {
  const userDetail = props.user;

  return (
    <Box textAlign="center">
      <Box pb={3}>
        <Avatar size="150" round name="Diego Silang" />
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" width={"100"}>
                Headline:
              </TableCell>
              <TableCell align="right">
                <span className="capitalize bold">{userDetail.headline}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                City:
              </TableCell>
              <TableCell align="right">
                <span className="capitalize bold">{userDetail.city}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Province:
              </TableCell>
              <TableCell align="right">
                <span className="bold">{userDetail.province}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Phone number:
              </TableCell>
              <TableCell align="right">{userDetail.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Details;
