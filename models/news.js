var mongoose = require('mongoose');


var eventSchema = new mongoose.Schema({
    title:{type:String, required:true},
    subtitle:{type:String, required:false},
    description: {type:String, required:true},
    date:{type:Date, required:false},    
    imageurl: {type:String, required:false,default:Date.now()}
});

const News = module.exports = mongoose.model('News', eventSchema);