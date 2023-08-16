import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/tb");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const customerSchema = new mongoose.Schema({
  custId: String,
});

const userSchema = new mongoose.Schema({
  userId: String,
  password: String,
  customers: [customerSchema],
});

const adminSchema = new mongoose.Schema({
  userId: String,
  password: String,
  users: [userSchema],
});

const Customer = mongoose.model("Customer", customerSchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

const testAdmin = {
  adminId: "12345",
  password: "12345",
  users: [],
};

!(await Admin.findOne({ userId: testAdmin.userId })) && Admin.create(testAdmin);

app.post("/login", (req, res) => {
  const reqUserType = req.body.userType;
  const reqUserId = req.body.userId;
  const reqAdminId = req.body.adminId;
  const reqPassword = req.body.password;
  console.log(reqUserType, reqAdminId, reqUserId, reqPassword);
  // if (userType === "admin") {
  //   Admin.create({
  //     userId: reqUserId,
  //     password: reqPassword,
  //     users: []
  //   })
  // }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4000, () => {
  console.log("server started at port 4000");
});
