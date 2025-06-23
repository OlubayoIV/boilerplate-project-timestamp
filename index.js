// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";
// your first API endpoint... 
/*app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date)
  if(isInvalidDate(date)) {
    date = new Date(+req.params.date)
  }
})*/

app.get("/api/:date", function (req, res) {
  let dateInput = req.params.date; // Get the date string from the URL parameter
  let dateObject;

  // Check if the dateInput looks like a Unix timestamp (a string of digits)
  // `Number(dateInput)` attempts to convert it to a number.
  // `isNaN` checks if that conversion resulted in Not-a-Number.
  // If it's NOT NaN and it's a valid integer (to prevent issues with floats),
  // then we treat it as a Unix timestamp.
  if (!isNaN(Number(dateInput)) && /^\d+$/.test(dateInput)) {
    dateObject = new Date(parseInt(dateInput));
  } else {
    dateObject = new Date(dateInput);
  }

   if (isInvalidDate(dateObject)) {
    res.json({ error: "Invalid Date" });
    return; 
  }

  // If the date is valid, return the unix and utc values
  res.json({
    unix: dateObject.getTime(),
    utc: dateObject.toUTCString()
  });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(), // Gets the current Unix timestamp
    utc: new Date().toUTCString() // Gets the current UTC string
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
