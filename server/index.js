import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

const app = express();

mongoose.connect("mongodb://localhost:27017/tb");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "blah blah cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return done(null, false);
    }
    if (!admin.password === password) {
      return done(null, false);
    }
    return done(null, admin);
  })
);

passport.initialize();
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

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

const testAdmin = {
  username: "12345",
  password: "12345",
  users: [],
};

!(await Admin.findOne({ userId: testAdmin.userId })) && Admin.create(testAdmin);

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4000, () => {
  console.log("server started at port 4000");
});
