const mongoose = require('mongoose');

const CivilSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true },
  projectName: { type: String },
  phoneNumber: { type: String, required: true },
  describe: { type: String },
  constructionType: { type: String, required: true },
  experience: { type: Number, required: true },
  servicesProvided: { type: [String], required: true },
  location: { type: String, required: true },
  availability: { type: String, required: true },
  category: { type: String, default: "civil" }, 
});

module.exports = mongoose.model('Civil', CivilSchema);
