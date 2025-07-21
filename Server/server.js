require("dotenv").config();

const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const MongoStore = require("connect-mongo");

const app = express();

const PORT = process.env.PORT || 3000;

const setRoute = require("./route/routes");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// init session
app.use(
    session({
        secret: "itsasecreat",
        resave: false,
        saveUninitialized: false,
        cookie: {
            // secure: true, // only use when the server in https
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: "lax",
        },
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaywc.mongodb.net/flatflow`,
            collectionName: "sessions",
        }),
    })
);
// for passportjs authentication
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passportAuth");

// starting the routes
setRoute(app);
// Catch 404 - Route Not Found
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

// Global Error Handler (for all errors)
app.use((error, req, res, next) => {
    console.error(error); // Optional: log for debugging

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
});

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaywc.mongodb.net/flatflow`)
    .then(() => {
        app.listen(PORT, () => {
            console.log(chalk.white.inverse(`🚀 app is listening in port ${PORT}`));
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });
