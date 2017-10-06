/*
  Author: Matthew Dobie
  Author URL: mattdobie.com
  Description: Server file for Timestamp Microservice
*/


// Import express
var express = require('express');

// Months variable
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Create instance of express & port variable
var app = express();
var port = process.env.PORT || 8080;

// Serve static index page
app.use(express.static('public'));

// Route to index page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Get call to return JSON date
app.get('/:dateVal', function(req, res) {
  var inputDate = req.params.dateVal;
  var date = parseDate(inputDate);
  if (!date) {
    res.json({
      unix: null,
      natural: null
    });
  }
  else {
    var unixDate = date.getTime() / 1000;
    var naturalDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    res.json({
      unix: unixDate,
      natural: naturalDate
    });
  }
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if (err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

// Listen for requests
app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});

// Parse date function
function parseDate(date) {
  if (isNaN(date)) {
    // Handle natural date
    var milliseconds = Date.parse(date);
    if (!isNaN(milliseconds)) {
      return new Date(milliseconds);
    }
    else {
      return false;
    }
  }
  else {
    // Handle unix date (in sec)
    return new Date(date * 1000);
  }
}

