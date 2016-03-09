'use strict';
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {type:String, required:true},
  lastName: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false},
  isPatient: {type: Boolean, default: true},
  createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);