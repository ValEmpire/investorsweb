const useSocketIo = require("socket.io");

const cookie = require("cookie");

const io = useSocketIo();

io.on("connection", socket => {
  // var cookies = socket.handshake.headers.cookie;

  // const parsedCookie = cookie.parse(cookies);

  // const { token } = parsedCookie;

  console.log(socket.id + " is connect");

  socket.emit("connected", "HEY CLIENT");

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

module.exports = { io };
