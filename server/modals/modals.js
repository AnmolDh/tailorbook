import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Customer = mongoose.model("Customer", customerSchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

export { Customer, User, Admin };
