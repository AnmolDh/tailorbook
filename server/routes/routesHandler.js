import { Admin, User } from "../modals/modals.js";
import express from "express";
const app = express();

app.post("/:action", async (req, res) => {
  if (req.isAuthenticated()) {
    ///////////////////////// TODO FROM HERE /////////////////////////
    if (req.params.action == "adduser") {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        customers: [],
      });
      const admin = await Admin.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { users: user } },
        { new: true }
      );
      console.log(admin);
      res.sendStatus(200);
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
