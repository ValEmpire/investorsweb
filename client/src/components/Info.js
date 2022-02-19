import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Info = props => {
  const { isLive, name, value } = props;

  return (
    <Grid item xs={6}>
      <Box p={2}>
        <Typography fontWeight={700} variant="h6">
          {name === "Status" && (
            <>
              {isLive ? (
                <span className="uppercase" style={{ color: "green" }}>
                  {value}
                </span>
              ) : (
                <span className="uppercase" style={{ color: "red" }}>
                  {value}
                </span>
              )}
            </>
          )}

          {name !== "Status" && value}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {name}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Info;
