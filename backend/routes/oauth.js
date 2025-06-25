const express = require("express");
const passport = require("passport");

const router = express.Router();

// Redirect user to Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Handle callback from Google
router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const { token, user } = req.user;
    // Redirect with token (or send it as response)
    res.redirect(`https://expense-tracker-1-70ug.onrender.com/oauth-success?token=${token}&name=${user.name}`);
  });

module.exports = router;
