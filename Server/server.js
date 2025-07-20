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

const authRoute = require("./route/auth.route");
const maintenanceRoute = require("./route/maintenance.route");

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

app.use("/auth", authRoute);
app.use("/api", maintenanceRoute);

// app.use((req, res, next) => {
//     console.log("📦 Session:", req.session);
//     console.log("👤 User:", req.user);
//     next();
// });

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
