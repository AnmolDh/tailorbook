import { User } from "../modals/modals.js";
import express from "express";
const app = express();

app.post("/:action", (req, res) => {
  if (req.isAuthenticated()) {
    ///////////////////////// TODO FROM HERE /////////////////////////
    if (req.params.action == "adduser") {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        customers: [],
      });
    }
  } else {
    res.send("it didn't work");
  }
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("hello");
  } else {
    res.send("it didn't work");
  }
});

export default app;
