const useSocketIo = require("socket.io");

const io = useSocketIo();

const { verifyToken } = require("./middlewares/user.middleware");

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

  socket.on("comment", data => {
    const { projectId, comment } = data;

    io.in(`project${projectId}Comments`).emit(`comment`, comment);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

module.exports = { io };
