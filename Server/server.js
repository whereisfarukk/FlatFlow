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

const authRoute = require("./route/authRoute");

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
      maxAge: 24 * 60 * 60 * 1000,
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

app.use((req, res, next) => {
  console.log("📦 Session:", req.session);
  console.log("👤 User:", req.user);
  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaywc.mongodb.net/flatflow`
    // `mongodb+srv://omarf6197:mynameisfaruk@cluster0.gaywc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.white.inverse(`🚀 app is listening in port ${PORT}`));
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
