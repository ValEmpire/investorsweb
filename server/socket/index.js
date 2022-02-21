const useSocketIo = require("socket.io");

const io = useSocketIo();

const { verifyToken } = require("./middlewares/user.middleware");

const model = require("../models");

const Comment = model.comment;

const Notification = model.notification;

const sockets = {};

io.on("connection", socket => {
  sockets["socket"] = socket;

  sockets["io"] = io;

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

  socket.on("registerNotification", async message => {
    const newNotification = await Notification.create({
      toUserId: id,
      fromUserId: 6,
      body: message,
      href: "/",
    });

    socket.emit("success", newNotification);
  });

  // when user open the project comments
  // join room with projectId

  // COMMENTS
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

    io.in(`project${projectId}Comments`).emit(`comment`, newComment);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

module.exports = { io, sockets };
