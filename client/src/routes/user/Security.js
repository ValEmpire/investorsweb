import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function Security(props) {
  const { user } = props;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              First name:
            </TableCell>
            <TableCell align="right">
              <span className="capitalize bold">{user.firstName}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Last name:
            </TableCell>
            <TableCell align="right">
              <span className="capitalize bold">{user.lastName}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Email:
            </TableCell>
            <TableCell align="right">
              <span className="bold">{user.email}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Password:
            </TableCell>
            <TableCell align="right">{"••••"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
