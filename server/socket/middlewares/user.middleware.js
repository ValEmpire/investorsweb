const jwt = require("jsonwebtoken");

const cookie = require("cookie");

module.exports = {
  verifyToken: socket => {
    console.log("verifying token");

    try {
      var cookies = socket.handshake.headers.cookie;

      const parsedCookie = cookie.parse(cookies);

      const { token } = parsedCookie;

      const user = jwt.verify(token, process.env.JWT_SECRET);

      return user.id;
    } catch (err) {
      return null;
    }
  },
};
