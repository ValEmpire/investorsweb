import io from "socket.io-client";

export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    // socket
    const socket = io(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });

    socket.on("connected", res => {
      console.log(`FROM SERVER ${res}`);

      if (res) resolve(socket);
    });

    return;
  });
};
