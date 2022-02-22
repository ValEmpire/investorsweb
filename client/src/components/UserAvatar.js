import React from "react";
import { Box, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Avatar from "react-avatar";

// Redux
import { useDispatch } from "react-redux";
import { uploadUserImage } from "../redux/actions/user.action";

const UserAvatar = props => {
  const dispatch = useDispatch();

  const { size, withUpload, onClick, className, user } = props;

  const { id, firstName, lastName, image } = user;

  const name = `${firstName} ${lastName}`;

  const handleUserImageUpload = e => {
    const image = e.target.files[0];

    dispatch(uploadUserImage(image, id));
  };

  return (
    <Box position="relative">
      <Avatar
        className={className}
        onClick={onClick}
        sx={{ height: size, width: size }}
        alt={name}
        round
        size={size}
        name={name}
        src={image ? image.url : null}
      />
      {withUpload && (
        <Box position="absolute" right={0} bottom={7}>
          <IconButton
            sx={{ background: "#c4c4c4", ":hover": { background: "#a4a4a4" } }}
            component="label"
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
