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

var now = new Date()
console.log(now)
//var options = {year: 'numeric', month: 'numeric', day: 'numeric' };
var j6 = new Date(now.setDate(now.getDate()+6))

//.toLocaleDateString("fr-FR", options)

console.log(j6)

const app = express()

// Défini le dossier ou chercher image etc...

app.use( express.static( "public" ) );

// Database client init
const configDB = require('./config/database.js')
var hits;
try {
  const db = mongoose.createConnection(configDB.url)
  hits = require("./application/models/hits.js")
} catch (error) {
  console.error("No MongoDB url set. Please provide it using environment variable.");
}

// Route for city information
require('./application/teleport.js')(app, hits)

require('./application/skyscanner.js')(app)

app.get('/', function (req, res) {
  res.render('index.ejs');
})

.post('/result', urlencodedParser, function (req, res) {

  console.log(req.body);

	var bb_fn	= req.body.depart;
  var coma_idx = bb_fn.indexOf(',');
  if (coma_idx > 0) {
    bb_fn = bb_fn.substring(0, coma_idx);
  }

	var bb_tn	= req.body.arrive;
  coma_idx = bb_tn.indexOf(',');
  if (coma_idx > 0) {
    bb_tn = bb_tn.substring(0, coma_idx);
  }

	var bb_db = req.body.date_depart;
	var bb_fin = req.body.date_retour;
	console.log(bb_db)
	var date_deb = Date.parse(bb_db)
	console.log(date_deb)
	// BLABLA Interogation API

  var arrive_id = req.body.arriveid

	var bb_request = require("request");

	var bb_options = {
		url: "https://public-api.blablacar.com/api/v2/trips?fn="+bb_fn+"&tn="+bb_tn+"&locale="+bb_locale+"&_format="+bb_format+"&cur="+bb_cur+"&db="+bb_db ,
		headers: {
			"accept": "application/json",
			"key": "b98d61a302fd44b2821ff3eadfd17956"
		}
	};

	function bb_callback(error, response, body) {
    if (error || response.statusCode != 200) {
      res.status(500).send("An error occurred while querying blablacar")
      return;
    }

		var bb_result = JSON.parse(body);

		var we_request = require("request");

		var we_options = {
			url: "https://www.metaweather.com/api/location/search/?query="+bb_tn
		};

			function we_callback(error, response, body) {
        if (error || response.statusCode != 200) {
          res.status(500).send("An error occurred while querying blablacar")
          return;
        }

				var we2_request = require("request");
				var we_city_result = JSON.parse(body);


				// Je ne comprends pas ce if mais il fonctionne

				if(we_city_result.length == 0){
					var sky = "nometeo"
          res.render('result.ejs', {loin:false, bb_db:bb_db, bb_fin:bb_fin, dep: bb_fn, arr: bb_tn, alle: bb_db.slice(8, 10)+"/"+bb_db.slice(5, 7)+"/"+bb_db.slice(0, 4), reto: bb_fin.slice(8, 10)+"/"+bb_fin.slice(5, 7)+"/"+bb_db.slice(0, 4), bb_result: bb_result, sky: sky, day:[], temp:[],arrive_id: arrive_id});
				}
				else{

					if (date_deb > j6){

						var d = new Date(bb_db);
						console.log(d)
						var d3 = new Date(d.setDate(d.getDate()))
						console.log(d3)
						var year_debut = d3.getFullYear()
						year_debut = (parseInt(year_debut)-1)
						console.log(year_debut)
						var month_debut = d3.getMonth()+1
						console.log(month_debut)
						var day_debut = d3.getDate()
						console.log(day_debut)
						var loin = true

					}
					else{

						var d = new Date(bb_db);
						console.log(d)
						var d3 = new Date(d.setDate(d.getDate()))
						console.log(d3)
						var year_debut = d3.getFullYear()
						console.log(year_debut)
						var month_debut = d3.getMonth()+1
						console.log(month_debut)
						var day_debut = d3.getDate()
						console.log(day_debut)
						var loin = false
					}
					var sky = []
					var temp = []
					var day = []

					function we2_callback(error, response, body) {

            if (error || response.statusCode != 200) {
              res.status(500).send("An error occurred while querying weather")
              return;
            }

						var we2_result = JSON.parse(body);
						if(sky.length<3){
							console.log(loin)
							sky.push("https://www.metaweather.com/static/img/weather/"+we2_result[3].weather_state_abbr+".svg")
							temp.push(we2_result[3].the_temp)
							day.push(we2_result[3].applicable_date.slice(5, 10))
							console.log("timeounin :"+d.getDate())
							d3 = new Date(d.setDate(d.getDate()+1))
							console.log(d3)
							year_debut = d3.getFullYear()
							if (date_deb > j6){
								year_debut = (parseInt(year_debut)-1)
							}
							console.log(year_debut)
							month_debut = d3.getMonth()+1
							console.log(month_debut)
							day_debut = d3.getDate()
							console.log(day_debut)

							var we2_options = {
								url: "https://www.metaweather.com/api/location/"+we_city_result[0].woeid+"/"+year_debut+"/"+month_debut+"/"+day_debut+"/"
							};

							we2_request(we2_options, we2_callback);

						}
						else{
                res.render('result.ejs', {loin:loin, bb_db:bb_db, bb_fin:bb_fin, dep: bb_fn, arr: bb_tn, alle: bb_db.slice(8, 10)+"/"+bb_db.slice(5, 7)+"/"+bb_db.slice(0, 4), reto: bb_fin.slice(8, 10)+"/"+bb_fin.slice(5, 7)+"/"+bb_db.slice(0, 4), bb_result: bb_result, sky: sky, day:day, temp:temp,arrive_id: arrive_id});
                return;
						}
					}

					var we2_options = {
						url: "https://www.metaweather.com/api/location/"+we_city_result[0].woeid+"/"+year_debut+"/"+month_debut+"/"+day_debut+"/"
					};

					we2_request(we2_options, we2_callback);
				}
			}

			we_request(we_options, we_callback);

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
