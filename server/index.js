// load .env data into process.env
require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app);
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Database
const db = require("./models");

// colors for logging the endPoints
app.use(morgan("dev"));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

app.use(express.json()); // for parsing application/json

app.use(cookieParser());

// ALL API ROUTES
app.use("/api/user", require("./routes/user.route"));
app.use("/api/userdetail", require("./routes/userDetail.route"));

const PORT = process.env.PORT || 8080;

db.sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
