import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

//Redux
import { useDispatch } from "react-redux";
import { submitInvestment } from "../../redux/actions/investment.action";

export default function Review(props) {
  const dispatch = useDispatch();
  const hendelSubmit = () => {
    dispatch(submitInvestment(props.amount, err => {}));
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          This Project is the part of our Finals in LightouseLabs as a Full
          Stack Developer.This is for demo purpose only.
        </Typography>
      </CardContent>
    </Card>
  );
}
