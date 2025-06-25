const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");


const jwt = require("jsonwebtoken");
require('dotenv').config();
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Client Secret:", process.env.GOOGLE_CLIENT_SECRET);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL  
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ email: profile.emails[0].value });
      let user = existingUser;
      if (!existingUser) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "", // No password for OAuth users
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return done(null, { token, user });
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
