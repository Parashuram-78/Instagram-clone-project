const passport = require("passport");
const strategy = require("passport-facebook").Strategy
const User = require("../../models/user")
// import userModel from "../user/user.model";

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name","id"]
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
    //   new userModel(userData).save();
      done(null, profile);
    }
  )
);
