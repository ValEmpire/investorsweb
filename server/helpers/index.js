const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (id) => {
    return jwt.sign(
      {
        iss: "investorsweb",
        id,
        expiresIn: "1d",
      },
      process.env.JWT_SECRET
    );
  },
};
