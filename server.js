const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send("Hello");
});

const port = process.env.PORT || 3009

app.listen(port, function(){
    
});

console.log('agora is running on port');

