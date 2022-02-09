// load .env data into process.env
require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app);
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Database
const db = require("./models");

// colors for logging the endPoints
app.use(morgan("dev"));

// CORS
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); // for parsing application/json

app.use(cookieParser());

// ALL API ROUTES
app.use("/api/user", require("./routes/user.route"));
app.use("/api/image", require("./routes/image.route"));
app.use("/api/userdetail", require("./routes/userDetail.route"));
app.use("/api/project", require("./routes/project.route"));
app.use("/api/comment", require("./routes/comment.route"));
app.use("/api/favorite", require("./routes/favorite.route"));
app.use("/api/investment", require("./routes/investment.route"));
app.use("/api/commentLike", require("./routes/commentLike.route"));
app.use("/api/stripe", require("./routes/stripe.route"));

const PORT = process.env.PORT || 3001;

db.sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
