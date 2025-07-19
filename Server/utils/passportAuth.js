const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../model/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "apartmentname", // map req.body.username
      passwordField: "password", // map req.body.password
    },
    async (apartmentname, password, done) => {
      try {
        const user = await User.findOne({ apartmentNumber: apartmentname });
        console.log(user);
        // username/email does not exist
        if (!user) {
          return done(null, false, {
            message: "username/email not registered",
          });
        }
        //email exist and now we need to verify password
        let match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
