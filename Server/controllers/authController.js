const User = require("../model/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.signupPostController = async (req, res, next) => {
  // let errors = validationResult(req).formatWith(errorFormatter);
  // if (!errors.isEmpty()) {
  //   return;
  //   // console.log(errors.mapped());
  //   // return res.render("pages/auth/signup", {
  //   //   error: errors.mapped(),
  //   //   oldInput: req.body,
  //   // });
  // }

  let { username, password } = req.body;
  console.log(req.body);

  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      username: username,
      password: hashedPassword,
    });

    let createUser = await user.save();
    console.log("user created successfully", createUser);
    res.status(201).json({ message: "User created", user: createUser }); // <-- Add this

    // res.render("pages/auth/signup");
  } catch (e) {
    console.log(e);
    next(e);
  }
  // console.log(req.body);
  // res.render("pages/auth/signup");
};

exports.loginPostController = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err); // internal server error

    if (!user) {
      // Login failed, send 401 with error message
      return res.status(401).json({ success: false, message: info.message });
    }

    // Manually log in the user
    req.login(user, (err) => {
      if (err) return next(err);

      // Success
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user, // optionally return user data
      });
    });
  })(req, res, next);
};
