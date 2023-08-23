import { Admin, User } from "../modals/modals.js";
import express from "express";
const app = express();

app.post("/:action", async (req, res) => {
  if (req.isAuthenticated()) {
    if (req.params.action == "adduser") {
      const admin = await Admin.findOne({ _id: req.user._id });
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        customers: [],
      });
      if (await User.findOne({ username: user.username })) {
        res.send("already there");
      } else {
        user.save();
        admin.users.push(user);
        admin.save();
      }
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

app.get("/admin", async (req, res) => {
  if (req.isAuthenticated()) {
    const admin = await Admin.findOne({ _id: req.user._id });
    res.send({
      username: admin.username,
      userCount: admin.users.length,
    });
  }
});

export default app;
