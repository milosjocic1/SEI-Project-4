
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://agorauser:agorasei66@agora.gffgzzx.mongodb.net/Agora";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Agora");
  dbo.createCollection("Product", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Agora");
  var myobj = { 
    category: "Womens", subCategory: "T-Shirts"};

  dbo.collection("Product").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

