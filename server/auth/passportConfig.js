import passport from "passport";
import LocalStrategy from "passport-local";
import { Admin, User } from "../modals/modals.js";

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async function (
    req,
    username,
    password,
    done
  ) {
    if (req.body.usertype == "admin") {
      console.log("logged as admin");
      const admin = await Admin.findOne({ username: username });
      if (!admin) {
        return done(null, false);
      }
      if (admin.password !== password) {
        return done(null, false);
      }
      return done(null, admin);
    } else {
      console.log("logged as user");
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    }
  })
);

export default passport;
