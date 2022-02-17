import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { uploadProjectImage } from "../../../redux/actions/project.action";

const UserAvatar = props => {
  const dispatch = useDispatch();

  const { projectFields } = useSelector(state => state.project);

  const userId = projectFields.owner.id;

  const projectId = projectFields.id;

  const handleUserImageUpload = image => {
    let img = new Image();

    img.src = window.URL.createObjectURL(image);

    img.onload = () => {
      // setLocalImageUrl(img.src);
    };

    dispatch(uploadProjectImage(image, userId, projectId));
  };

  return (
    <Box pb={1}>
      <Box pb={1}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Upload Project Image
        </Typography>
      </Box>

      <Box display="flex" justifyContent={"center"}>
        <Box>
          <Box width={600} pb={3}>
            <CardMedia component="img" src={projectFields.imageUrl} />
          </Box>

          <Box display={"flex"} justifyContent="center">
            <FileUploader
              multiple={false}
              handleChange={handleUserImageUpload}
              name="file"
              types={["JPEG", "PNG"]}
              label="Upload new image here"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserAvatar;
