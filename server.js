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

port = process.env.PORT
if (port == null) {
  port = 8089
}
app.listen(port, function () {
  console.log('Example app listening on port '+port)
})
