import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleProjectFavorite } from "../../redux/actions/project.action";

export default function Favorite(props) {
  const project = props.project;
  const { isFavorite } = useSelector(state => state.project);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(toggleProjectFavorite(props.projectId));
  };

  return (
    <Grid>
      <IconButton onClick={handleSubmit} aria-label="favorite" color="primary">
        {isFavorite && <FavoriteIcon />}
        {!isFavorite && <FavoriteBorderIcon />}
      </IconButton>
    </Grid>
  );
}
