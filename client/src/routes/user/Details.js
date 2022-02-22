import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { formatPhoneNumber } from "../../helpers/allHelpers";
import UserAvatar from "../../components/UserAvatar";

const Details = props => {
  const { userDetail } = props.user;

  return (
    <Box>
      <Box pb={3}>
        <Box display={"flex"} justifyContent="center">
          <UserAvatar user={props.user} size={175} withUpload={true} />
        </Box>
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
              <TableCell align="right">
                <span className="bold">
                  {formatPhoneNumber(userDetail.phoneNumber)}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Details;
