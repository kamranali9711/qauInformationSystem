var mongoose = require('mongoose');


var eventSchema = new mongoose.Schema({
    title:{type:String, required:true},
    subtitle:{type:String, required:false},
    description: {type:String, required:true},
    
    date:{type:String, required:false,default:Date.now()},
    imageurl: {type:String, required:false}
});

const Events = module.exports = mongoose.model('Events', eventSchema);