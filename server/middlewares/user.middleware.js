const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models").user;
const Image = require("../models").image;
const { admin } = require("../firebase");

// extract cookie from jwt
const extractCookie = req => {
  let jwt = null;

  if (req && req.cookies) jwt = req.cookies["token"];

  return jwt;
};

// use passport for authenticating users
passport.use(
  "auth",
  new JwtStrategy(
    {
      jwtFromRequest: extractCookie,

      // the secretOrKey must be the same as the secret used in generating token
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: payload.id,
          },
          attributes: {
            exclude: ["password"],
          },
        });

        // check token expiration
        if (Date.now() > payload.expiration) {
          done("Token expired", false);
        }

        // if user is not found
        if (!user) {
          return done("Unauthorized", false);
        }

        // continue
        done(null, user);
      } catch (error) {
        error["success"] = false;

        done(error, false);
      }
    }
  )
);

module.exports = {
  userMiddleware: async (req, res, next) => {
    try {
      const { email } = req.validatedBody;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      req.userFound = user;

      next();
    } catch (err) {
      console.log(err.message);

      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },

  userAuth: passport.authenticate("auth", { session: false }),

  firebaseAuth: async (req, res, next) => {
    try {
      const { token } = req.body;

      const decodedToken = await admin.auth().verifyIdToken(token);

      let user = await admin.auth().getUser(decodedToken.uid);

      const { email, photoURL, displayName, providerId } = user.providerData[0];

      if (!displayName || !photoURL) {
        throw new Error(
          "Cannot use github. Please complete your github profile first."
        );
      }

      let url = "";

      if (providerId === "github.com") {
        url = photoURL;
      } else {
        url = photoURL.slice(0, -6);
      }

      const fullName = displayName.split(" ");

      const firstName = fullName[0];

      const lastName = fullName[fullName.length - 1];

      const [foundUser, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          firstName,
          lastName,
        },
      });

      if (!created) {
        req.user = foundUser;

        next();

        return;
      }

      const newImage = await Image.create({
        url,
      });

      foundUser.imageId = newImage.id;

      await foundUser.save();

      req.created = created;

      req.user = foundUser;

      next();

      return;
    } catch (err) {
      console.log(err);

      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
  },
};
