import React, { useState, useRef } from "react";
import cn from "classnames";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const INITIAL_HEIGHT = 46;

const CommentBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };
  const onChange = (e) => {
    setCommentValue(e.target.value);
  };
  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("send the form data somewhere");
  };

  return (
    <div style={{ padding: 14 }}>
      <Box textAlign="center" pb={3}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item sm={4} xs={12} pb={3}>
            <Typography component="h1" variant="h5" pb={3}>
              Comments
            </Typography>

            <form
              onSubmit={onSubmit}
              ref={containerRef}
              className={cn("comment-box", {
                expanded: isExpanded,
                collapsed: !isExpanded,
                modified: commentValue.length > 0,
              })}
              style={{
                minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT,
              }}
            >
              <Grid item pb={3}>
                <textarea
                  ref={textRef}
                  onClick={onExpand}
                  onFocus={onExpand}
                  onChange={onChange}
                  className="comment-field"
                  placeholder=" Add a public comment..."
                  value={commentValue}
                  name="comment"
                  id="comment"
                  style={{ width: "100%" }}
                />
              </Grid>
              <div className="actions">
                <button type="button" className="cancel" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" disabled={commentValue.length < 1}>
                  Respond
                </button>
              </div>
            </form>

            <Box textAlign="center" pb={3}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Michel" src="images/Avatar.png.webp" />
                </Grid>
                <Grid justifyContent="center" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>Michel</h4>
                  <p style={{ textAlign: "left" }}>
                    As someone who has had robotic surgery, I'm curious about
                    how your product works remotely and in the field because a
                    typical surgery involves several medical professionals,
                    hence the increased cost. How does your product address
                    staffing requirements for surgery procedures? How are these
                    needs met when the product is sent into the field (i.e.
                    military zones and areas where skilled medical professionals
                    are limited)?{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted 10 minute ago
                  </p>
                </Grid>
              </Grid>
              <Divider style={{ margin: "30px 0" }} />

              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="David D." src="images/Avatar.png.webp" />
                </Grid>
                <Grid justifyContent="center" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>David D.</h4>
                  <p style={{ textAlign: "left" }}>
                    Very intriguing enterprise or, I daresay, paradigm shift. I
                    see great utility and scalability for your AI-enhanced
                    surgical robot, and hope to be counted among your earliest
                    crowdfunding backers. I'm sure you're keeping a close eye on
                    Monogram, although that is a strictly ortho-robot. Looking
                    forward to the journey.{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted 4 hours ago
                  </p>
                </Grid>
              </Grid>
              <Divider style={{ margin: "30px 0" }} />

              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Stephen B." src="images/Avatar.png.webp" />
                </Grid>
                <Grid justifyContent="center" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>Stephen B.</h4>
                  <p style={{ textAlign: "left" }}>
                    Hello, thank you for offering this opportunity. Do you have
                    any patents that are owned by the company? If so, how many
                    do you have in the US? Thank you for your time.{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted 6 hours ago
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CommentBox;
