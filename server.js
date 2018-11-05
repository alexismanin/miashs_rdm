const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Database client init
const configDB = require('./config/database.js')

try {
  const db = mongoose.createConnection(configDB.url)
} catch (error) {
  console.error("No MongoDB url set. Please provide it using environment variable.");
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8089, function () {
  console.log('Example app listening on port 8089!')
})
