import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = (props) => {
  return (
    <Box
      height={props.height}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Box>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div" color="primary">
              <i>iWeb</i>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
