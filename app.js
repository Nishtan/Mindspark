if (process.env.NODE_ENV !== "production") { require("dotenv").config() }

const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const collegeRoutes = require('./routes/collegeRoutes');
const studentRoutes = require("./routes/studentRoutes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

const dbUrl = 'mongodb://localhost:27017/mindspark'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind('console', "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});


var cron = require('node-cron');
cron.schedule('0 12 * * Sun', () => {

}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


app.get('/', (req, res) => res.render('home'));
app.use("/college", collegeRoutes);
app.use("/student", studentRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});