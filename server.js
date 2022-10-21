const express = require('express');

require("dotenv").config();

const flash = require("connect-flash");

const mongoose = require("mongoose");

const PORT = process.env.PORT;

const app = express();

app.use(flash());

app.use(express.static("public"));

const expressLayouts = require("express-ejs-layouts");

// Import routes here
// const authRouter = require('./routes/auth');
const indexRouter = require("./routes/index");

app.use(expressLayouts);

// app.get("/", function(req, res) {
//     res.send("Hello");
// });

// Mount routes here
app.use("/", indexRouter);

app.set("view engine", "ejs");

mongoose.connect(
    process.env.MongoDBURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("MongoDB connected!!!");
    }
  );

app.listen(PORT, () => {
    console.log(`Agora is running on port ${PORT}`);
  });
