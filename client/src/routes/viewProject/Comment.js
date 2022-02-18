import React, { useState } from "react";

import { Button, Divider, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const CommentBox = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [commentValue, setCommentValue] = useState("");

  const ReplyArea = props.replyArea;

  const onChange = e => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("send the form data somewhere");
  };

  const handleReplyTextField = () => {
    setIsExpanded(true);
  };

  return (
    <Box display="flex">
      <Box pr={2}>
        <Avatar alt="Michel" src="images/Avatar.png" />
      </Box>
      <Box>
        <Box pb={1} display="flex" alignItems="center">
          <Box pr={2}>
            <Typography variant="body1" fontWeight={700}>
              Michel
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            posted 10 minute ago
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          As someone who has had robotic surgery, I'm curious about how your
          product works remotely and in the field because a typical surgery
          involves several medical professionals, hence the increased cost. How
          does your product address staffing requirements for surgery
          procedures? How are these needs met when the product is sent into the
          field (i.e. military zones and areas where skilled medical
          professionals are limited)?{" "}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton color="primary" size="small">
            <ThumbUpOutlinedIcon fontSize="20px" />
          </IconButton>
          <Typography variant="body2">0</Typography>
          <Box pl={2} ml={1}>
            <Button variant="text" size="small" onClick={handleReplyTextField}>
              Reply
            </Button>
          </Box>
        </Box>

        {isExpanded && (
          <ReplyArea
            onChange={onChange}
            onClose={onClose}
            commentValue={commentValue}
            name="reply"
          />
        )}
      </Box>
      <Divider style={{ margin: "30px 0" }} />
    </Box>
  );
};

const CommentArea = props => {
  const { onChange, onClose, commentValue, name } = props;

  return (
    <>
      <TextField
        onChange={onChange}
        placeholder={`Add a ${name}...`}
        value={commentValue}
        name="comment"
        fullWidth
        multiline
      />
      <Box textAlign={"right"} pt={1}>
        <button type="button" className="cancel" onClick={onClose}>
          {name === "comment" ? "Reset" : "Cancel"}
        </button>
        <button type="submit" disabled={commentValue.length < 1}>
          Submit
        </button>
      </Box>
    </>
  );
};

const CommentSection = () => {
  const [commentValue, setCommentValue] = useState("");

  const onChange = e => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("send the form data somewhere");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box pb={1} mb={1}>
          <CommentArea
            onChange={onChange}
            onClose={onClose}
            commentValue={commentValue}
            name="comment"
          />
        </Box>

        <CommentBox replyArea={CommentArea} />
      </Grid>
    </Grid>
  );
};

export default CommentSection;