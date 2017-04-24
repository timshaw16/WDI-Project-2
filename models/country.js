const mongoose    = require('mongoose');

// A Schema stores the data I want to get from user and show page
const countrySchema = new mongoose.Schema({
  region: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, trime: true}
  // resort: { type: String, required: true },
  // description: { type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);
