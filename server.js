const express = require('express');

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();



app.get("/", function(req, res) {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Agora is running on port ${PORT}`);
  });