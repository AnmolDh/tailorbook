import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  custId: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  customers: [customerSchema],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  users: [userSchema],
});

const Customer = mongoose.model("Customer", customerSchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

export { Customer, User, Admin };
