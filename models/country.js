const mongoose    = require('mongoose');
mongoose.Promise  = require('bluebird');

// A Schema stores the data I want to get from user and show page
const countrySchema = new mongoose.Schema({
  region: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, trime: true},
  resorts: [{
    name: { type: String, trim: true },
    website: { type: String, trim: true },
    lat: { type: String, trim: true },
    lng: { type: String, trim: true }
  }]
}, {
  timestamps: true
});

countrySchema.statics.findAndGroupByRegion = function() {
  return this
    .find()
    .exec()
    .then(countries => {
      const results = {};
      countries.map(country => country.region).forEach(region => {
        if (!results[region]) results[region] = [];
      });
      countries.map(country => {
        results[country.region].push(country);
      });
      return results;
    });
};

module.exports = mongoose.model('Country', countrySchema);
