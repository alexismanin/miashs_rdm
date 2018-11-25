const mongoose = require('mongoose')

const hitsSchema = mongoose.Schema({
  	_id: String,
    cityName: String,
    hits: Number
})

module.exports = function(app, db) {
  const hits = db.model("Hits", hitsSchema)

  app.get('/topsearch', function(req, resp) {
  	// TODO : add query parameters to customize returned information.
	  try {
	  	hits.find()
	  		.sort('hits')
	  		.limit(5)
	  		.then(data => resp.send(data))
	  		.onError(error => console.error("MongoDB Top search query failed. Cause:"+error.message))
	  } catch (error) {
	  	console.error("MongoDB Top search query failed. Cause:"+error.message)
	  }
  })

  return hits
}
