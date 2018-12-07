// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

// Build our routes
const programmers = [];
programmers[database["SID"]] = database;

app.get('/', (req, res) => {
  res.json(programmers);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send(programmers[id]);
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  programmers[id] = req.body;
  console.log(id);
  res.send(programmers[id]);
});

app.post('/', (req, res) => {
  const body = req.body; // Hold your JSON in here!
  console.log(body);
  programmers[body.SID] = body
  console.log(programmers)
  res.sendStatus(200)
 });

// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE
//Used link below to learn how to handle other routes.
//https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes
app.all("*", (req, res) => {
	res.send("ERROR: Route is not valid");
	console.log("ERROR: Route is not valid")

});
app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
