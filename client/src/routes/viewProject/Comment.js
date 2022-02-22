import React, { useState, useEffect, useCallback } from "react";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "../../components/UserAvatar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

//HELPERS
import moment from "moment";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addReply,
  getAllComments,
  updateComments,
} from "../../redux/actions/comment.action";

const CommentBox = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [commentValue, setCommentValue] = useState("");

  const { comment, commentId, socket, projectId } = props;

  const ReplyArea = props.replyArea;

  const onChange = e => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmitReply = e => {
    e.preventDefault();

    socket.emit("commentReply", {
      commentId,
      comment: commentValue,
      projectId,
    });

    setCommentValue("");
  };

  const handleReplyTextField = () => {
    setIsExpanded(true);
  };

  return (
    <Box>
      <Box display="flex">
        {/* Avatar */}
        <Box pr={2}>
          <Avatar size={50} user={comment.user} />
        </Box>
        <Box width="100%">
          {/* NAME AND DATE */}
          <Box pb={1} display="flex" alignItems="center">
            <Box pr={2}>
              <Typography variant="body1" fontWeight={700}>
                <span className="capitalize">
                  {`${comment.user.firstName} ${comment.user.lastName}`}
                </span>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {moment(comment.createdAt).fromNow()}
            </Typography>
          </Box>

          {/* BODY */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {comment.body}
            </Typography>
          </Box>

          {/* ACTIONS */}
          <Box display="flex" alignItems="center">
            <IconButton color="primary" size="small">
              <ThumbUpOutlinedIcon fontSize="20px" />
            </IconButton>
            <Typography variant="body2">0</Typography>
            {projectId && (
              <Box pl={2} ml={1}>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleReplyTextField}
                >
                  Reply
                </Button>
              </Box>
            )}
          </Box>

          {isExpanded && (
            <ReplyArea
              onChange={onChange}
              onClose={onClose}
              onSubmit={onSubmitReply}
              commentValue={commentValue}
              name="reply"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

const CommentArea = props => {
  const { onChange, onClose, commentValue, name, onSubmit } = props;

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
      <Box textAlign={"right"} pt={1} component="form" onSubmit={onSubmit}>
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

  const { socket } = useSelector(state => state.socket);

  const { projectId } = useParams();

  const { comments } = useSelector(state => state.comment);

  const [loading, setLoading] = useState(true);

  const handleProjectComments = useCallback(() => {
    dispatch(
      getAllComments(projectId, (err, success) => {
        setLoading(false);

        return;
      })
    );

    return;
  }, [dispatch, projectId]);

  const handleCommentsSocket = useCallback(() => {
    socket.emit(`projectComments`, projectId);

    socket.on(`comment`, comment => {
      dispatch(updateComments(comment));
    });

    socket.on(`commentReply`, comment => {
      dispatch(addReply(comment));
    });
  }, [socket, projectId, dispatch]);

  // ComponentDidMount
  useEffect(() => {
    handleProjectComments();

    // join room
    handleCommentsSocket();
  }, [handleProjectComments, handleCommentsSocket]);

  const onChange = e => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
  };

  const onSubmit = e => {
    e.preventDefault();

    socket.emit("comment", {
      comment: commentValue,
      projectId,
    });

    setCommentValue("");
  };

  return (
    <>
      {loading && <Loading height={150} />}
      {!loading && (
        <Grid container>
          <Grid item xs={12}>
            <Box pb={1} mb={1}>
              <CommentArea
                onChange={onChange}
                onClose={onClose}
                commentValue={commentValue}
                name="comment"
                onSubmit={onSubmit}
              />
            </Box>
            {comments.map((comment, i) => {
              return (
                <Box key={comment.id + i}>
                  <CommentBox
                    replyArea={CommentArea}
                    projectId={projectId}
                    commentId={comment.id}
                    comment={comment}
                    socket={socket}
                  />

                  {comment.reply &&
                    comment.reply.map((reply, i) => (
                      <Box key={reply.id + i} mt={2} ml={3}>
                        <CommentBox comment={reply} />
                      </Box>
                    ))}

                  <Divider style={{ margin: "30px 0" }} />
                </Box>
              );
            })}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CommentSection;
