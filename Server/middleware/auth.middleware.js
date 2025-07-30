const { roles } = require("../utils/userRole");

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Please log in to access this resource.",
        });
    }
};
exports.isAdmin = (req, res, next) => {
    console.log(req.user);
    // console.log("user object", req.user.isLoggedIn);
    if (req.user.role === roles.admin) {
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Please log in as a admin to access this resource.",
        });
    }
};
