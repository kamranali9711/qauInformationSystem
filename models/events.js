var mongoose = require('mongoose');


var eventSchema = new mongoose.Schema({
    title:{type:String, required:true},
    subtitle:{type:String, required:false},
    description: {type:String, required:true},
    imageurl: {type:String, required:false},
    date:{type:Date, required:true,default:Date.now()}
});

const Events = module.exports = mongoose.model('Events', eventSchema);