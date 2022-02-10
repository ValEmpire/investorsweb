import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Avatar from "react-avatar";

const Member = props => {
  const { name, img, github } = props;

  return (
    <Grid item sm={4} xs={12}>
      <Box textAlign="center" pt={2} mt={2} mb={2} pb={3}>
        <Box pt={2} pb={2}>
          <Avatar name={name} size={200} src={img} round />
        </Box>
        <Box pb={1}>
          <Typography variant="h5" color="primary">
            <b>{name} </b>
          </Typography>
        </Box>
        <Button href={github} target="_blank" variant="outlined">
          Follow
        </Button>
      </Box>
    </Grid>
  );
};

const Team = () => {
  const members = [
    {
      name: "ValEmpire",
      img: "https://avatars.githubusercontent.com/u/35951681?v=4",
      github: "https://github.com/ValEmpire",
    },
    {
      name: "NehaYadav",
      img: "",
      github: "https://github.com/NehaYadav903",
    },
    {
      name: "ValeraNeg",
      img: "",
      github: "https://github.com/Valera-Neg",
    },
  ];

  return (
    <Container>
      <Box textAlign={"center"}>
        <Typography variant="h4">
          <b>OUR TEAM</b>
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        {members.map((member, i) => (
          <Member {...member} key={member.name + i} />
        ))}
      </Grid>
    </Container>
  );
};

export default Team;
