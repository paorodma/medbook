'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  name: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, unique:true, required:true},
  password: {type:String, required:true},
  isAdmin: {type: Boolean, default: false},
  isPatient: {type: Boolean, default: true},
  createDate: { type: Date, default: Date.now },
  salt: String,
  hash: String
});

UserSchema.methods.setPassword = function(plainTextPassword){
    console.log('Inside setPassword');
  	this.salt = crypto.randomBytes(16).toString('hex');
  	console.log('salt: ' + this.salt);
    /*console.log(crypto.pbkdf2Sync(plainTextPassword, this.salt, 1000, 64).toString('hex'));*/
  	/*var hash = crypto.pbkdf2Sync(plainTextPassword, this.salt, 1000, 64).toString('hex');
  	console.log(hash);*/
  }

/*UserSchema.methods.validPassword = function(typedPassword){
	var generatedHash = crypto.pbkdf2Sync(typedPassword, this.salt, 1000, 64).toString('hex');
	return this.hash === generatedHash;
}*/

module.exports = mongoose.model('User', UserSchema);