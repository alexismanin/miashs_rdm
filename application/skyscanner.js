var sk_key = process.env.SKKEY

const request = require("request")

/**
 * Search for airports near given city
 */
function autosuggest(cityName, responseCallback) {
  suggest_options = {
    url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/autosuggest/v1.0/FR/EUR/fr-FR/?query="+cityName,
    headers: {
      "X-Mashape-Key": sk_key,
      "X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
    }
  }

  request(suggest_options, (error, response, body) => {
    if (error) {
      responseCallback(error, null);
    } else if (response.statusCode != 200) {
      responseCallback(new Error("Auto-suggest failed with error: "+response.statusCode), null)
    } else {
      var suggestBody = JSON.parse(body);
      if (suggestBody == null || suggestBody.Places == null || suggestBody.Places.length < 1) {
        responseCallback(new Error("No airport found for given city !"), null)
      } else {
        cityAirport = suggestBody.Places[0].PlaceId;
        responseCallback(null, cityAirport);
      }
    }
  })
}

function searchTravels(departureCity, arrivalCity, departureDate, returnDate, callback) {
  console.log(departureDate)
  console.log(returnDate)
  var searchOptions = {
    url: "https://skyscanner-skyscanner-flight-search-v1.p.mashape.com/apiservices/browseroutes/v1.0/FR/EUR/fr-FR/"+departureCity+"/"+arrivalCity+"/"+departureDate+"/"+returnDate,
    headers: {
      "X-Mashape-Key": sk_key,
      "X-Mashape-Host": "skyscanner-skyscanner-flight-search-v1.p.mashape.com"
    }
  }

    request(searchOptions, (error, response, body) => {
      callback(null, body);
    })
}


module.exports = function(app) {

    // get an instance of the router for main routes
     app.get("/skyscanner", (req, resp) => {
       if (req.query.departure == null || req.query.departure == '') {
         resp.status(400).send("Missing query parameter departure (departure city)")
       } else if (req.query.arrival == null || req.query.arrival == '') {
           resp.status(400).send("Missing query parameter arrival (arrival city)")
       } else if (req.query.since == null || req.query.since == '') {
           resp.status(400).send("Missing query parameter since (departure date)")
       } else if (req.query.until == null || req.query.until == '') {
           resp.status(400).send("Missing query parameter until (return date)")
       }
       autosuggest(req.query.departure, (error, departureCity) => {
         if (error) {
           resp.status(500).send(error.message);
         } else {
            autosuggest(req.query.arrival, (error, arrivalCity) => {
              if (error) {
                resp.status(500).send(error.message);
              }

              searchTravels(departureCity, arrivalCity, req.query.since, req.query.until, (error, body) => {
                if (error) {
                  resp.status(500).send(error.message)
                } else {
                  var travels = JSON.parse(body);
                  for (var j = 0 ; j < 5 && j < travels.Quotes.length ; j++) {
                      // TODO : convert data structure
                  }
                  resp.set("Content-Type", "application/json")
                  resp.send(travels)
                }
              })
            })
         }
       })

     })
   }
