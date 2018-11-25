const request = require("request")

function extractUrbanAreaLink(cityDoc) {
  const ua = cityDoc["_links"]['city:urban_area'];
  if (ua == null || ua.href == null) {
    return null;
  }

  return ua.href;
}

module.exports = function(app, hits) {

    // get an instance of the router for main routes
     app.get("/cityinfo/:geonameId", (req, resp) => {
       const id = req.params.geonameId
       console.log("received: "+id)
       request.get("https://api.teleport.org/api/cities/geonameid%3A"+id, (error, resp2, cityBody) => {
         if (error) {
           resp.send();
         }

         const cityObj = JSON.parse(cityBody)

         // HACK : update city top search here, to avoid extra queries when
         // submitting search form.
         if (hits) {
           hits.update(
            {_id: id},
            {cityName: cityObj.name, $inc: {hits: 1}},
            {upsert: true},
            (err, obj) => {
              if (err != null) {
                console.error("Cannot update search count: "+err.message)
              }
            }
           )
         }
         const uaLink = extractUrbanAreaLink(cityObj);
         if (uaLink == null) {
           resp.send({
             population: cityObj.population,
             bbox: {
               latlon: {
                 south: cityObj.location.latlon.latitude - 0.05,
                 north: cityObj.location.latlon.latitude + 0.05,
                 west: cityObj.location.latlon.longitude - 0.05,
                 east: cityObj.location.latlon.longitude + 0.05
               }
             }
           })
           return;
         }
         request.get(uaLink, (error, resp3, uaBody) => {
           uaObj = JSON.parse(uaBody)
           request.get(uaObj._links["ua:images"].href, (error, resp4, imgBody) => {
             request.get(uaObj._links["ua:scores"].href, (error, resp5, scoreBody) => {
               var scoreObj = JSON.parse(scoreBody)
               resp.send({
                 population: cityObj.population,
                 bbox: uaObj.bounding_box,
                 mayor: uaObj.mayor,
                 photo: JSON.parse(imgBody).photos[0],
                 summary: scoreObj.summary,
                 categories: scoreObj.categories
               })
             })
           })
         })
       })
     })
}
