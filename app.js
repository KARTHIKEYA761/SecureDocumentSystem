const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const db = mongoose.connect(
  "mongodb+srv://febinsamuel:FEBIN28@febin24.p5kneov.mongodb.net/?retryWrites=true&w=majority&appName=Febin24",
  mongoOpts,
  (err, res) => {
    if (err) {
      console.log("Error connecting to MongoDB Atlas:");
      console.log(err);
    } else {
      console.log("\nConnected to MongoDB Atlas successfully.");
    }
  }
);

// Configuring Express Application.
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Routes
const users = require("./routes/user-route");
const documents = require("./routes/documents-route");

app.use("/users", users);
app.use("/documents", documents);

// Pointing to production index.html file as landing page.
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use((error, req, res, next) => {
  return res.json({ success: false, msg: error.toString() });
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`\nServer Started on ${port}`);
});
