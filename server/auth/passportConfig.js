import passport from "passport";
import LocalStrategy from "passport-local";
import { Admin } from "../modals/modals.js";

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

export default passport;
