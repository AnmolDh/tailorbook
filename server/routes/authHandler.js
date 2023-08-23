import passport from "passport";
import express from "express";
const app = express();

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/invalid_credentials" }),
  (req, res) => {
    res.sendStatus(200);
  }
);

app.get("/invalid_credentials", (req, res) => {
  res.json({
    invalid: true,
  });
});

export default app;
