import io from "socket.io-client";

export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    // socket
    const socket = io(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });

    socket.on("connected", res => {
      if (res) resolve(socket);
    });

    return;
  });
};

export const registerNotification = () => {
  return new Promise((resolve, reject) => {
    // socket
    const socket = io(process.env.REACT_APP_SERVER, {
      withCredentials: true,
    });

    socket.on("connected", res => {
      if (res) {
        socket.emit(
          "registerNotification",
          "Welcome to iWeb. Thank you for trusting us."
        );
      }
    });

    socket.on("success", notification => {
      resolve(notification);
    });

    return;
  });
};
