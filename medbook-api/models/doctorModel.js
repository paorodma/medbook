'use strict';
var mongoose = require('mongoose');

var DoctorSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  specialty: String,
  patients: [],
  appointments: []
});

module.exports = mongoose.model('Doctor', DoctorSchema);