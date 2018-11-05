const express = require('express')
const mongoose = require('mongoose')

// Blablacar variable

import BlablacarClient from "node-blablacar";
var client_blabla = new BlablacarClient("b98d61a302fd44b2821ff3eadfd17956"); // Blablacar API Key

// Doc Blablacar API https://dev.blablacar.com/docs/versions/1.0/getting-started

const app = express()

// Database client init
const configDB = require('./config/database.js')

try {
  const db = mongoose.createConnection(configDB.url)
} catch (error) {
  console.error("No MongoDB url set. Please provide it using environment variable.");
}

app.get('/', function (req, res) {
  res.render('index.ejs');
})

.get('/', function (req, res) {
  res.render('result.ejs');
})

app.listen(8089, function () {
  console.log('Example app listening on port 8089!')
})




