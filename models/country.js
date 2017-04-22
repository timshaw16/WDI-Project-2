const mongoose    = require('mongoose');

// A Schema stores the data I want to get from user and show page
const countrySchema = new mongoose.Schema({
  country: { type: String, required: true },
  region: { type: String, required: true },
  resort: { type: String, required: true },
  description: { type: String}
});

module.exports = mongoose.model('Country', countrySchema);
