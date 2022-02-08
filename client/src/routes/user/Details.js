import React from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Avatar from "react-avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const Details = (props) => {
  const userDetail = props.user;

  return (
    <Box>
      <Box pb={3}>
        <Box display={"flex"} justifyContent="center">
          <Box position="relative">
            <Avatar size="150" round name="Diego Silang" />
            <Box position="absolute" right={0} bottom={3}>
              <IconButton sx={{ background: "#e9e9e9" }} component="label">
                <CameraAltIcon />
                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={() => {
                    console.log("uploading");
                  }}
                />
              </IconButton>
            </Box>
          </Box>
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
              <TableCell align="right">{userDetail.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Details;
