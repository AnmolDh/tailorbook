import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

const app = express();

mongoose.connect("mongodb://localhost:27017/tb");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "blah blah cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await Admin.findOne({ username: username });
    if (!user) {
      return done(null, false);
    }
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await Admin.findOne({ _id: id });
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
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
    if (req.isAuthenticated()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }
);

app.post("/:action", (req, res) => {
  if (req.isAuthenticated()) {
    /////////////////////////////// TODO HERE
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

app.listen(4000, () => {
  console.log("server started at port 4000");
});
