var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
];

var waitlist = [
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});


// Create New Reservations - takes in JSON input
app.post("/api/tables", function(req, res) {
  
  var newReserve = req.body;

  console.log(newReserve);

  if (reservations.length < 5){
    reservations.push(newReserve);
    res.json("reserve");
  }else{
    waitlist.push(newReserve);
    res.json("wait");
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
