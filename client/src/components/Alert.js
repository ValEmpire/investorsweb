import React, { forwardRef } from "react";
import { Snackbar, Box, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/actions/alert.action";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = () => {
  const dispatch = useDispatch();

  const { open, message, type } = useSelector(state => state.alert);

  const position = {
    vertical: "bottom",
    horizontal: "center",
  };

  const handleClose = () => {
    dispatch(
      setAlert({
        open: false,
        message: null,
        type: null,
      })
    );
  };

  return (
    <Box>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ ...position }}
        open={open}
        TransitionComponent={props => <Slide {...props} direction="up" />}
        message={"I love snacks"}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomAlert;
