const express = require('express');

require("dotenv").config();

const flash = require("connect-flash");

const mongoose = require("mongoose");

const PORT = process.env.PORT

const app = express();

app.use(flash());

app.use(express.static("public"));

const expressLayouts = require("express-ejs-layouts");

// Import routes here
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/products");
// const cartRouter = require("./routes/cart");


app.use(expressLayouts);

let session = require("express-session");
let passport = require("./helper/ppConfig");

app.use(session({
  // secret used for authenticating our user
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 360000000}
}))

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", function(req, res) {
//     res.send("Hello");
// });

// Mount routes here
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", productRouter);
// app.use("/", cartRouter);

app.set("view engine", "ejs");



// Database Connection
mongoose.connect(process.env.DATABASE_URL,
  { useNewURLParser: true, useUnifiedTopology: true},
  () => {
      console.log('MongoDB connected!')
  }
);

app.listen(PORT, () => {
  console.log(PORT)
    console.log(`Agora is running on port ${PORT}`);
  });
