const express = require('express')
const mongoose = require('mongoose')

var EventEmitter = require('events')
var ee = new EventEmitter()

// BLABLACAR 

import BlablacarClient from "node-blablacar";
var client_blabla = new BlablacarClient("b98d61a302fd44b2821ff3eadfd17956"); // Blablacar API Key

// BLABLA Doc API https://dev.blablacar.com/docs/versions/1.0/getting-started

// BLABLA Variables

var bb_fn	// the departure place name
var bb_tn	// the arrival place name
var bb_locale	// Available locales and their possible currencies are detailed here)
const bb_format	= "json" // format du la reponse
const bb_cur = "EUR"// Select the currency you want, depending on the requested locale. For example, with the "en_GB" locale, use GBP to get prices in British Pounds


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

// On click






