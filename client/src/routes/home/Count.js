import React from "react";
import { Grid, Box } from "@mui/material";
import { Container, Typography } from "@mui/material";

const Item = props => {
  const { count, name, desc } = props;

  return (
    <Grid item sm={4} xs={12}>
      <Box textAlign="center" pb={3}>
        <Typography variant="h2" color="primary" fontWeight={600}>
          {count}
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {name}
        </Typography>
      </Box>
      <Typography color="text.secondary">{desc}</Typography>
    </Grid>
  );
};

const Count = () => {
  const items = [
    {
      count: "600K",
      name: "Investors",
      desc: "More than 600,000 prospective investors are part of our community.",
    },
    {
      count: "$600M",
      name: "Raised",
      desc: "Over half a billion dollars have been invested on StartEngine to date.",
    },
    {
      count: "500+",
      name: "Offerings Funded",
      desc: "More than 500 offerings have been successfully funded on StartEngine.",
    },
  ];

  return (
    <Container maxWidth={"xl"} component={Box} mt={6} pt={6} mb={6} pb={6}>
      <Grid container direction="row" alignItems="flex-start" spacing={10}>
        {items.map((item, i) => (
          <Item {...item} key={i} />
        ))}
      </Grid>
    </Container>
  );
};

export default Count;
