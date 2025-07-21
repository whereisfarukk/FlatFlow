const User = require("../model/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.signupPostController = async (req, res, next) => {
    let { username, password } = req.body;
    console.log(req.body);

    try {
        let hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({
            ...req.body,
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
    // console.log(req.body);
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

// update/change password
exports.updatePasswordController = async (req, res, next) => {
    const { current_password, new_password, confirm_new_password } = req.body;
    if (new_password === confirm_new_password) {
        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                const error = new Error("User not found");
                error.status = 400;
                return next(error);
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({
                success: true,
                message: "Password updated successfully",
            });
        } catch (err) {
            next(err);
        }
    } else {
        return res.status(400).json({ success: false, message: "New password and confirm password do not match" });
    }
};

// route: POST /logout or GET /logout
exports.logoutController = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Logout failed" });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Session destruction failed" });
            }

            res.clearCookie("connect.sid", {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                // secure: true, // enable only on HTTPS
            });

            return res.status(200).json({ success: true, message: "Logged out successfully" });
        });
    });
};
