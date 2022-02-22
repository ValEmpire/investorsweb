import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoriteProject,
  toggleProjectFavorite,
} from "../../redux/actions/project.action";

export default function Favorite(props) {
  const { isFavorite } = useSelector(state => state.project);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(toggleProjectFavorite(props.projectId));
  };

  useEffect(() => {
    if (props.user.id) {
      dispatch(getFavoriteProject(props.projectId));
    }
  }, [dispatch, props.projectId, props.user.id]);

  return (
    <Grid>
      <IconButton onClick={handleSubmit} aria-label="favorite" color="primary">
        {props.user.id && isFavorite && <FavoriteIcon />}
        {props.user.id && !isFavorite && <FavoriteBorderIcon />}
      </IconButton>
    </Grid>
  );
}
