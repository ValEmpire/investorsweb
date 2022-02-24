import React from "react";
import { Box, Card, CardMedia } from "@mui/material";

const ProjectImage = props => {
  const { investment } = props;

  return (
    <Card
      md={8}
      xs={12}
      sx={{
        border: "none",
        boxShadow: "none",
      }}
    >
      <Box>
        <CardMedia
          sx={{
            height: "100%",
          }}
          component="img"
          image={investment.project.logo ? investment.project.logo.url : null}
          alt={investment.project.name}
        />
      </Box>
    </Card>
  );
};

export default ProjectImage;
