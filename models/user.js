var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true, required: true },
    username:{type: String, unique: true, required: true},
    password: { type: String, required: true },

    // role:{type:String,default:'student',enum:['student','admin']},
    // department:{type:String,required:true},
    // semester:{type:String,required:true},
    // degree:{type:String,required:true},

});

const User = module.exports = mongoose.model('User',UserSchema);