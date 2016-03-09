'use strict';
var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  gender: String,
  birthDate: Date,
  bloodType: String,
  diseases: [],
  medicines: [],
  doctors: [],
  appointments: [], 
  documents: [],
  labResults: []
});

module.exports = mongoose.model('Patient', PatientSchema);