require("dotenv").config();

const express = require("express");
const chalk = require("chalk");

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(chalk.white.inverse(`🚀 app is listening in port ${PORT}`));
});
