import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { uploadUserImage } from "../redux/actions/user.action";
import { getInitials } from "../helpers/allHelpers";

const UserAvatar = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const { id, firstName, lastName, image } = user;

  const { size, withUpload, onClick, className } = props;

  const name = `${firstName} ${lastName}`;

  const handleUserImageUpload = e => {
    const image = e.target.files[0];

    // let img = new Image();

    // img.src = window.URL.createObjectURL(image);

    // get the image size
    // img.onload = () => {
    //   alert(img.width + " " + img.height);
    // };

    dispatch(uploadUserImage(image, id));
  };

  return (
    <Box position="relative">
      <Avatar
        className={className}
        onClick={onClick}
        sx={{ height: size, width: size }}
        alt={name}
        src={image.url ?? "/images/dp.jpg"}
      >
        {getInitials(firstName, lastName)}
      </Avatar>
      {withUpload && (
        <Box position="absolute" right={0} bottom={7} color="white">
          <IconButton
            sx={{ background: "#9C27B0", ":hover": { background: "#9C55B0" } }}
            component="label"
            color="inherit"
          >
            <CameraAltIcon />
            <input
              type="file"
              hidden
              accept="image/png, image/jpeg"
              onChange={handleUserImageUpload}
            />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default UserAvatar;
