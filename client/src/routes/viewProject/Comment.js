import React, { useState, useEffect } from "react";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useParams } from "react-router-dom";

//HELPERS
import { capitalizeFirstLetter } from "../../helpers/allHelpers";
import moment from "moment";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../redux/actions/comment.action";

const CommentBox = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const comment = props.comment;
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
        <Avatar
          alt={comment.user.firstName}
          src={comment.user.image ? comment.user.image.url : null}
        />
      </Box>
      <Box>
        <Box pb={1} display="flex" alignItems="center">
          <Box pr={2}>
            <Typography variant="body1" fontWeight={700}>
              {capitalizeFirstLetter(comment.user.firstName)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {comment.body}
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
        fullWidth
        multiline
        onChange={onChange}
        placeholder={`Add a ${name}...`}
        value={commentValue}
        name="comment"
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

  const dispatch = useDispatch();

  const { projectId } = useParams();
  // console.log(projectId);

  const { comments } = useSelector(state => state.comment);

  const [loading, setLoading] = useState(true);

  const handleProjectComments = async () => {
    await dispatch(getAllComments(projectId));

    setLoading(false);

    return;
  };

  useEffect(() => {
    handleProjectComments();
  }, []);

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
        {comments.map(comment => (
          <CommentBox
            key={comment.id}
            comment={comment}
            replyArea={CommentArea}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default CommentSection;
