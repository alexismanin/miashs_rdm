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
	var bb_fin = req.body.date_retour;
	
	// BLABLA Interogation API
	
	var bb_request = require("request");
	
	var bb_options = {
		url: "https://public-api.blablacar.com/api/v2/trips?fn="+bb_fn+"&tn="+bb_tn+"&locale="+bb_locale+"&_format="+bb_format+"&cur="+bb_cur+"&db="+bb_db ,
		headers: {
			"accept": "application/json",
			"key": "b98d61a302fd44b2821ff3eadfd17956"
		}
	};
	
	function bb_callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var bb_result = JSON.parse(body);
			
			var we_request = require("request");
	
			var we_options = {
				url: "https://www.metaweather.com/api/location/search/?query="+bb_tn
			};
			
			function we_callback(error, response, body) {
				if (!error && response.statusCode == 200) {
					
					var we2_request = require("request");
					var we_city_result = JSON.parse(body);
					
					console.log(we_city_result.length)
					
					// Je ne comprends pas ce if mais il fonctionne
					
					if(we_city_result.length == 0){
						console.log("pas de meteo")
						var sky = "nometeo"
						res.render('result.ejs', {bb_result: bb_result, sky: sky, day:[], temp:[]});
					}
					else{
					
						var year_debut = (parseInt(bb_db.slice(0, 4))-1).toString()
						console.log(year_debut)
						var month_debut = bb_fin.slice(5, 7)
						console.log(month_debut)
						var day_debut = bb_fin.slice(8, 10)
						console.log(day_debut)
						
						function we2_callback(error, response, body) {
							var we2_result = JSON.parse(body);
							if (!error && response.statusCode == 200) {
								// console.log("https://www.metaweather.com/static/img/weather/"+we2_result[3].weather_state_abbr+".svg")
								// console.log(we2_result[3].the_temp)
								// console.log(we2_result[3].created)
								
								var sky = ["https://www.metaweather.com/static/img/weather/"+we2_result[3].weather_state_abbr+".svg", "https://www.metaweather.com/static/img/weather/"+we2_result[19].weather_state_abbr+".svg", "https://www.metaweather.com/static/img/weather/"+we2_result[35].weather_state_abbr+".svg"];
								var temp = [we2_result[3].the_temp, we2_result[19].the_temp, we2_result[35].the_temp];
								var day = [we2_result[3].created.slice(5, 10), we2_result[19].created.slice(5, 10), we2_result[35].created.slice(5, 10)];
								
								res.render('result.ejs', {bb_result: bb_result, sky: sky, temp: temp, day: day});
								// console.log(bb_result.trips[0].links._front);
							}
						}
				
						var we2_options = {
							url: "https://www.metaweather.com/api/location/"+we_city_result[0].woeid+"/"+year_debut+"/"+month_debut+"/"+day_debut+"/"
						};
						
						we2_request(we2_options, we2_callback);
					
					}
				}
			}	
			
			we_request(we_options, we_callback);

		}
	}
	
	// WEATHER Interogation API
	
	// Doc API https://www.metaweather.com/api/
	
	// REQUEST
 
	bb_request(bb_options, bb_callback);
	
})

port = process.env.PORT
if (port == null) {
  port = 8089
}
app.listen(port, function () {
  console.log('Example app listening on port '+port)
})

// On click






