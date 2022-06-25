// Dependencias
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const override = require("method-override");
const exphbs = require("express-handlebars");
const routes = require("./routes");
require("dotenv").config();

// Settings
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(override("_method"));
app.use(routes);
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.engine(
  ".hbs",
  exphbs.engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    defaultLayout: "main",
    extname: ".hbs",
  })
);

// DB Connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch(err => console.log(err));

module.exports = app;