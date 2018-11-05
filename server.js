const express = require('express');
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var EventEmitter = require('events')
var ee = new EventEmitter()

// BLABLACAR 

// import BlablacarClient from "node-blablacar";
// var client_blabla = new BlablacarClient("b98d61a302fd44b2821ff3eadfd17956"); // Blablacar API Key

// BLABLA Doc API https://dev.blablacar.com/docs/versions/1.0/getting-started

// BLABLA Variables

var bb_fn	= "" // the departure place name
var bb_tn	= "" // the arrival place name
const bb_locale	= "fr_FR" // Available locales and their possible currencies are detailed here)
const bb_format	= "json" // format du la reponse
const bb_cur = "EUR" // Select the currency you want, depending on the requested locale. Ici euros
var bb_db = "" //begin of the period of the requested 


const app = express()

// Défini le dossier ou chercher image etc...

app.use( express.static( "public" ) );

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

.post('/result', urlencodedParser, function (req, res) {
	
	// BLABLA
	
	var bb_fn	= req.body.depart;
	var bb_tn	= req.body.arrive;
	var bb_db = req.body.date_depart;
	
	// BLABLA Interogation API
	
	var bb_request = require("request");
	
	var options = {
		url: "https://public-api.blablacar.com/api/v2/trips?fn="+bb_fn+"&tn="+bb_tn+"&locale="+bb_locale+"&_format="+bb_format+"&cur="+bb_cur+"&db="+bb_db ,
		headers: {
			"accept": "application/json",
			"key": "b98d61a302fd44b2821ff3eadfd17956"
		}
	};
	
	function callback(error, response, body) {
		console.log(response);
		if (!error && response.statusCode == 200) {
			console.log("commence");
			var bb_result = JSON.parse(body);
			console.log("commence2");
			res.render('result.ejs', {bb_result: bb_result});
			console.log(bb_result.trips[0].links._front);
		}
	}
 
	bb_request(options, callback);
	
})

app.listen(8089, function () {
  console.log('Example app listening on port 8089!')
})

// On click






