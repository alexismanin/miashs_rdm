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
// Route for city information
require('./application/teleport.js')(app)

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


					// Je ne comprends pas ce if mais il fonctionne

					if(we_city_result.length == 0){
						var sky = "nometeo"
						//res.render('result.ejs', {bb_result: bb_result, sky: sky, day:[], temp:[]});
						//BLOBLOBLOOOOOO

						// console.log("https://www.metaweather.com/static/img/weather/"+we2_result[3].weather_state_abbr+".svg")
						// console.log(we2_result[3].the_temp)
						// console.log(we2_result[3].created)


						// SKYCANNER

						var sk_key = process.env.SKKEY
            console.log(sk_key)

						// Depart

						var sk_depart_request = require("request");

						var sk_depart_options = {
							url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/autosuggest/v1.0/FR/EUR/fr-FR/?query="+bb_fn,
							headers: {
								"X-Mashape-Key": sk_key,
								"X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
							}
						};

						function sk_depart_callback(error, response, body) {
              if (error != null || response.statusCode != 200) {
                if (error) {
                  console.log(error)
                } else if (response.statusCode != 200) {
                  console.log("response: "+response.statusCode+"\n"+body)
                }
                res.render('result.ejs', {dep: bb_fn, arr: bb_tn, alle: bb_db.slice(8, 10)+"/"+bb_db.slice(5, 7)+"/"+bb_db.slice(0, 4), reto: bb_fin.slice(8, 10)+"/"+bb_fin.slice(5, 7)+"/"+bb_db.slice(0, 4), bb_result: bb_result, sky: sky, day:[], temp:[],SkPrix: null,ComAll: null,ComRet: null,AeoAllDep: null,AeoAllArr: null,AeoRetDep: null,AeoRetArr: null, arrive_id: arrive_id});
              } else {
                console.log("Arrive here: departure")
    						var sk_result_dep = JSON.parse(body);
								var sk_aeo_dep = sk_result_dep.Places[0].PlaceId

								// Arrivée

								var sk_arrive_request = require("request");

								var sk_arrive_options = {
									url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/autosuggest/v1.0/FR/EUR/fr-FR/?query="+bb_tn,
									headers: {
										"X-Mashape-Key": sk_key,
										"X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
									}
								};

								function sk_arrive_callback(error, response, body) {
                  if (error) {
                    console.log(error)
                  } else if (response.statusCode != 200) {

                    console.log("response: "+response.statusCode+"\n"+body)
                  }
									var sk_result_arr = JSON.parse(body);
									if (!error && response.statusCode == 200) {
                    console.log("Arrive here: arrive")
										var sk_aeo_arr = sk_result_arr.Places[0].PlaceId

										// Récupération des vols

										var sk_route_request = require("request");

										var sk_routes_options = {
											url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/browseroutes/v1.0/FR/EUR/fr-FR/"+sk_aeo_dep+"/"+sk_aeo_arr+"/"+bb_db+"/"+bb_fin,
											headers: {
												"X-Mashape-Key": sk_key,
												"X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
											}

										};

										function sk_routes_callback(error, response, body) {
											var sk_result_route = JSON.parse(body);
											//console.log(sk_result_route)
											if (!error && response.statusCode == 200) {
												//console.log(sk_result_route.Quotes.length)
												var sk_price=[]
												var sk_retour_company=[]
												var sk_alle_company=[]
												var sk_alle_arrivee_aeroport=[]
												var sk_alle_depart_aeroport=[]
												var sk_retour_arrivee_aeroport=[]
												var sk_retour_depart_aeroport=[]
												for(j=0;j<sk_result_route.Quotes.length;j++){
													sk_price.push(sk_result_route.Quotes[j].MinPrice);
												//pour le vol d'allé
													for(i=0;i<sk_result_route.Carriers.length;i++){

														if(sk_result_route.Quotes[j].OutboundLeg.CarrierIds[0]==sk_result_route.Carriers[i].CarrierId){
															 sk_alle_company.push(sk_result_route.Carriers[i].Name)
														}
														if(sk_result_route.Quotes[j].InboundLeg.CarrierIds[0]==sk_result_route.Carriers[i].CarrierId){
															 sk_retour_company.push(sk_result_route.Carriers[i].Name)
														}
													}
													//console.log(sk_alle_company)

													for(i=0;i<sk_result_route.Places.length;i++){

														if(sk_result_route.Quotes[j].OutboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
															 sk_alle_depart_aeroport.push(sk_result_route.Places[i].Name)
														}
														if(sk_result_route.Quotes[j].InboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
															 sk_alle_arrivee_aeroport.push(sk_result_route.Places[i].Name)
														}
													//console.log(sk_alle_arrivee_aeroport)
													//console.log(sk_alle_depart_aeroport)
													}

													for(i=0;i<sk_result_route.Places.length;i++){

														if(sk_result_route.Quotes[j].InboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
															 sk_retour_depart_aeroport.push(sk_result_route.Places[i].Name)
														}else if(sk_result_route.Quotes[j].OutboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
															 sk_retour_arrivee_aeroport.push(sk_result_route.Places[i].Name)
														}
													//console.log(sk_retour_depart_aeroport)
													}
													//console.log("for 4 fini")

												}


												res.render('result.ejs', {dep: bb_fn, arr: bb_tn, alle: bb_db.slice(8, 10)+"/"+bb_db.slice(5, 7)+"/"+bb_db.slice(0, 4), reto: bb_fin.slice(8, 10)+"/"+bb_fin.slice(5, 7)+"/"+bb_db.slice(0, 4), bb_result: bb_result, sky: sky, day:[], temp:[],SkPrix: sk_price,ComAll: sk_alle_company,ComRet: sk_retour_company,AeoAllDep: sk_alle_depart_aeroport,AeoAllArr: sk_alle_arrivee_aeroport,AeoRetDep: sk_retour_depart_aeroport,AeoRetArr: sk_retour_arrivee_aeroport, arrive_id: arrive_id});
													//console.log(sk_alle_company)


											}
										}

										sk_route_request(sk_routes_options, sk_routes_callback)

									}
								}

								sk_arrive_request(sk_arrive_options, sk_arrive_callback)

							}
						}

						sk_depart_request(sk_depart_options, sk_depart_callback);



						//



						//res.render('result.ejs', {bb_result: bb_result, sky: sky, temp: temp, day: day});
						// console.log(bb_result.trips[0].links._front);

						//BloBloBloBlo

					}
					else{

						var year_debut = (parseInt(bb_fin.slice(0, 4))-1).toString()
						var month_debut = bb_fin.slice(5, 7)
						var day_debut = bb_fin.slice(8, 10)

						function we2_callback(error, response, body) {

                if (error) {
                  console.log(error)
                } else if (response.statusCode != 200) {
                  console.log("response: "+response.statusCode+"\n"+body)
                }

							var we2_result = JSON.parse(body);
							if (!error && response.statusCode == 200) {
								// console.log("https://www.metaweather.com/static/img/weather/"+we2_result[3].weather_state_abbr+".svg")
								// console.log(we2_result[3].the_temp)
								// console.log(we2_result[3].created)

								var sky = ["https://www.metaweather.com/static/img/weather/"+we2_result[3].weather_state_abbr+".svg", "https://www.metaweather.com/static/img/weather/"+we2_result[19].weather_state_abbr+".svg", "https://www.metaweather.com/static/img/weather/"+we2_result[35].weather_state_abbr+".svg"];
								var temp = [we2_result[3].the_temp, we2_result[19].the_temp, we2_result[35].the_temp];
								var day = [we2_result[3].created.slice(5, 10), we2_result[19].created.slice(5, 10), we2_result[35].created.slice(5, 10)];

								// SKYCANNER

								var sk_key = process.env.SKKEY
                console.log(sk_key)

								// Depart

								var sk_depart_request = require("request");

								var sk_depart_options = {
									url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/autosuggest/v1.0/FR/EUR/fr-FR/?query="+bb_fn,
									headers: {
										"X-Mashape-Key": sk_key,
										"X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
									}
								};

								function sk_depart_callback(error, response, body) {

                    if (error) {
                      console.log(error)
                    } else if (response.statusCode != 200) {
                      console.log("response: "+response.statusCode+"\n"+body)
                      res.render('result.ejs', {dep: bb_fn, arr: bb_tn, alle: bb_db.slice(8, 10)+"/"+bb_db.slice(5, 7)+"/"+bb_db.slice(0, 4), reto: bb_fin.slice(8, 10)+"/"+bb_fin.slice(5, 7)+"/"+bb_db.slice(0, 4), bb_result: bb_result, sky: sky, day:[], temp:[],SkPrix: null,ComAll: null,ComRet: null,AeoAllDep: null,AeoAllArr: null,AeoRetDep: null,AeoRetArr: null, arrive_id: arrive_id});

                    }

									var sk_result_dep = JSON.parse(body);
									if (!error && response.statusCode == 200) {
										var sk_aeo_dep = sk_result_dep.Places[0].PlaceId

										// Arrivée

										var sk_arrive_request = require("request");

										var sk_arrive_options = {
											url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/autosuggest/v1.0/FR/EUR/fr-FR/?query="+bb_tn,
											headers: {
												"X-Mashape-Key": sk_key,
												"X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
											}
										};

										function sk_arrive_callback(error, response, body) {
											var sk_result_arr = JSON.parse(body);
											if (!error && response.statusCode == 200) {
												var sk_aeo_arr = sk_result_arr.Places[0].PlaceId

												// Récupération des vols

												var sk_route_request = require("request");

												var sk_routes_options = {
													url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/browseroutes/v1.0/FR/EUR/fr-FR/"+sk_aeo_dep+"/"+sk_aeo_arr+"/"+bb_db+"/"+bb_fin,
													headers: {
														"X-Mashape-Key": sk_key,
														"X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
													}

												};

												function sk_routes_callback(error, response, body) {
													var sk_result_route = JSON.parse(body);
													//console.log(sk_result_route)
													if (!error && response.statusCode == 200) {
														//console.log(sk_result_route.Quotes.length)
														var sk_price=[]
														var sk_retour_company=[]
														var sk_alle_company=[]
														var sk_alle_arrivee_aeroport=[]
														var sk_alle_depart_aeroport=[]
														var sk_retour_arrivee_aeroport=[]
														var sk_retour_depart_aeroport=[]
														for(j=0;j<sk_result_route.Quotes.length;j++){
															sk_price.push(sk_result_route.Quotes[j].MinPrice);
														//pour le vol d'allé
															for(i=0;i<sk_result_route.Carriers.length;i++){

																if(sk_result_route.Quotes[j].OutboundLeg.CarrierIds[0]==sk_result_route.Carriers[i].CarrierId){
																	 sk_alle_company.push(sk_result_route.Carriers[i].Name)
																}
																if(sk_result_route.Quotes[j].InboundLeg.CarrierIds[0]==sk_result_route.Carriers[i].CarrierId){
																	 sk_retour_company.push(sk_result_route.Carriers[i].Name)
																}
															}
															//console.log(sk_alle_company)

															for(i=0;i<sk_result_route.Places.length;i++){

																if(sk_result_route.Quotes[j].OutboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
																	 sk_alle_depart_aeroport.push(sk_result_route.Places[i].Name)
																}
																if(sk_result_route.Quotes[j].InboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
																	 sk_alle_arrivee_aeroport.push(sk_result_route.Places[i].Name)
																}
															//console.log(sk_alle_arrivee_aeroport)
															//console.log(sk_alle_depart_aeroport)
															}

															for(i=0;i<sk_result_route.Places.length;i++){

																if(sk_result_route.Quotes[j].InboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
																	 sk_retour_depart_aeroport.push(sk_result_route.Places[i].Name)
																}else if(sk_result_route.Quotes[j].OutboundLeg.OriginId==sk_result_route.Places[i].PlaceId){
																	 sk_retour_arrivee_aeroport.push(sk_result_route.Places[i].Name)
																}
															//console.log(sk_retour_depart_aeroport)
															}
															//console.log("for 4 fini")

														}

														res.render('result.ejs', {dep: bb_fn, arr: bb_tn, alle: bb_db.slice(8, 10)+"/"+bb_db.slice(5, 7)+"/"+bb_db.slice(0, 4), reto: bb_fin, bb_result: bb_result, sky: sky, temp: temp, day: day,SkPrix: sk_price,ComAll: sk_alle_company,ComRet: sk_retour_company,AeoAllDep: sk_alle_depart_aeroport,AeoAllArr: sk_alle_arrivee_aeroport,AeoRetDep: sk_retour_depart_aeroport,AeoRetArr: sk_retour_arrivee_aeroport, arrive_id:arrive_id});
															//console.log(sk_alle_company)


													}
												}

												sk_route_request(sk_routes_options, sk_routes_callback)

											}
										}

										sk_arrive_request(sk_arrive_options, sk_arrive_callback)

									}
								}

								sk_depart_request(sk_depart_options, sk_depart_callback);



								//



								//res.render('result.ejs', {bb_result: bb_result, sky: sky, temp: temp, day: day});
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
