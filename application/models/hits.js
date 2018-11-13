const mongoose = require('mongoose')

const hitsSchema = mongoose.Schema({
  hits: {
    cityName: String,
    hits: Integer
  }
})

module.exports = function(db) {
  db.model("Hits", hitsSchema)
}
