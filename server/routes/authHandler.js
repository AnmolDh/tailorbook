import passport from "passport";
import express from "express";
const app = express();

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }
);

export default app;
