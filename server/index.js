import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import passportConfig from "./auth/passportConfig.js";
import { Admin, User, Customer } from "./modals/modals.js";
import handleAuthRoutes from "./routes/authHandler.js";
import handleRoutes from "./routes/routesHandler.js";

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

app.use(handleAuthRoutes);
app.use(handleRoutes);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const testAdmin = {
  username: "12345",
  password: "12345",
  users: [],
};

!(await Admin.findOne({ userId: testAdmin.userId })) && Admin.create(testAdmin);

app.listen(4000, () => {
  console.log("server started at port 4000");
});
