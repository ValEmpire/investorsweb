import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// Redux
import { useDispatch } from "react-redux";
import { updateUserDetail } from "../../redux/actions/user.action";

const UpdateDetails = props => {
  const dispatch = useDispatch();

  const { open, handleClose, user } = props;

  const [userDetail, setUserDetail] = useState(user.userDetail);

  const handleField = e => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  const provinces = [
    "Quebec",
    "Ontario",
    "Manitoba",
    "Saskatchewan",
    "Alberta",
    "British Columbia",
    "Yukon",
    "Northwest Territories",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Nova Scotia",
    "New Brunswick",
    "Nunavut",
  ];

  const [province, setProvince] = React.useState(user.userDetail.province);

  const handleProvince = event => {
    setProvince(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(updateUserDetail({ ...userDetail, province: province }));

    handleClose();

    return;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        height={"90vh"}
      >
        <Grid item lg={5} md={6} sm={9} xs={11}>
          <Paper variant="outlined">
            <Box textAlign={"right"}>
              <Button onClick={handleClose}>Close</Button>
            </Box>

            <Grid container justifyContent={"center"}>
              <Grid item md={8} xs={11}>
                <Box textAlign={"center"} pb={3}>
                  <Typography variant="h6">Update Details</Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    required
                    id="headline"
                    name="headline"
                    label="Headline"
                    fullWidth
                    rows={4}
                    value={userDetail.headline || ""}
                    onChange={e => handleField(e)}
                    multiline
                  />

                  <TextField
                    margin="normal"
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    value={userDetail.city || ""}
                    onChange={e => handleField(e)}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="provinceField">Province</InputLabel>
                    <Select
                      labelId="provinceField"
                      value={province || ""}
                      label="Province"
                      name="province"
                      onChange={handleProvince}
                    >
                      {provinces.map((province, i) => (
                        <MenuItem key={province + i} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    value={userDetail.phoneNumber || ""}
                    onChange={e => handleField(e)}
                    id="phoneNumber"
                    inputProps={{
                      maxLength: 10,
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 4 }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default UpdateDetails;
