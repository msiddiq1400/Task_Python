/*

after installing all (sudo apt install npm , npm install express , npm install  mysql2), run node cities.js
*/
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require('cors');

// Create a new Express.js app
const app = express();

// Parse JSON bodies in incoming requests
app.use(bodyParser.json());

// Connect to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "andrea",
  password: "",
  database: "data"
});

//setting middleware
//app.use('/dist', express.static('dist'));

app.use(cors({
    allowedOrigins: [
        'http://localhost:3000'
    ]
}));


// test get
app.get("/aa", (req, res) => {
  console.log('ewew')
})


// Handle a POST request to the /search endpoint
app.post("/search", (req, res) => {
  // Get the city name from the request body
  const city = req.body.city;
  console.log('received'+city)
  // Query the database for the population of the city
  db.query(
    "SELECT sum(population) as population FROM cities WHERE city = ? group by city",
    [city],
    (error, results) => {
      if (error) {
        // Handle the error
        console.log(error)
        res.status(500).json({ error });
      } else if (results.length > 0) {
      	console.log(results)
        // Return the population to the client
        res.json({ population: results[0].population });
      } else {
      	console.log('err2')
        // City was not found in the database
        res.status(404).json({ error: "City not found." });
      }
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
