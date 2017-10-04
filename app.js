/*
  Author: Matthew Dobie
  Author URL: mattdobie.com
  Description: Server file for Timestamp Microservice
*/


// Required imports
var express = require('express');
var path = require('path');

// Months variable
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Create instance of express
var app = express();

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
  res.end();
});

// Listen on port 8080
app.listen(8080, function() {
  console.log("Listening on port 8080...");
})

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

