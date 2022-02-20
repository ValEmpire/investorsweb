const useSocketIo = require("socket.io");

const io = useSocketIo();

const { verifyToken } = require("./middlewares/user.middleware");

const Comment = require("../models").comment;

io.on("connection", socket => {
  // verify token
  const id = verifyToken(socket);

  // check if id is valid
  if (id) {
    // emit to client that token is valid
    // need this. client is awaiting to resolve
    socket.emit("connected", "Your token is valid!");

    // this will make the user join his own room

    // user notifications
    socket.join(`user${id}Notifications`);

    // user messages
    socket.join(`user${id}Messages`);
  }

  // when user open the project comments
  // join room with projectId
  socket.on("projectComments", projectId => {
    console.log(socket.id, "join room");

    socket.join(`project${projectId}Comments`);
  });

  socket.on("comment", async data => {
    const { projectId, comment, commentId } = data;

    const newComment = await Comment.create({
      userId: id,
      projectId,
      body: comment,
      commentId,
    });

    await newComment.save();

    io.in(`project${projectId}Comments`).emit(`comment`, newComment);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

module.exports = { io };
