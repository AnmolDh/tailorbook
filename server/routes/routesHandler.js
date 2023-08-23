import { Admin, Customer, User } from "../modals/modals.js";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("hello");
  } else {
    res.sendStatus(401);
  }
});

app.get("/admin", async (req, res) => {
  if (req.isAuthenticated()) {
    const admin = await Admin.findOne({ _id: req.user._id }).populate("users");
    res.send({
      usertype: "admin",
      username: admin.username,
      userCount: admin.users.length,
      users: admin.users,
    });
  } else {
    res.sendStatus(401);
  }
});

app.post("/admin/adduser", async (req, res) => {
  if (req.isAuthenticated()) {
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
  } else {
    res.sendStatus(401);
  }
});

app.delete("/admin/rmuser/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const admin = await Admin.findById(req.user._id);
    const user = await User.findById(req.params.id);
    admin.users.pull(req.params.id);
    admin.save();
    user.remove();
  } else {
    res.sendStatus(401);
  }
});

app.get("/user", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ _id: req.user._id }).populate(
      "customers"
    );
    res.send({
      usertype: "user",
      username: user.username,
      customersCount: user.customers.length,
      customers: user.customers,
    });
  } else {
    res.sendStatus(401);
  }
});

app.post("/user/addcustomer", async (req, res) => {
  if (req.isAuthenticated()) {
    const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
    });
    const user = await User.findById(req.user._id);
    if (await Customer.findOne({ phone: req.body.phone })) {
      res.send("already there");
    } else {
      customer.save();
      user.customers.push(customer);
      user.save();
    }
  } else {
    res.sendStatus(401);
  }
});

app.delete("/user/rmCustomer/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await User.findById(req.user._id);
    const customer = await Customer.findById(req.params.id);
    user.customers.pull(req.params.id);
    customer.remove();
  } else {
    res.sendStatus(401);
  }
});

app.patch("/user/editCustomer/:id", async (req, res) => {
  const response = await Customer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name, phone: req.body.phone } },
    { new: true }
  );
  res.send(response);
});

export default app;
