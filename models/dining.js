var mongoose = require('mongoose');


var diningSchema = new mongoose.Schema({
    name:{type:String, required:true},
    menu:{type:String, required:true}
});

const Dining = module.exports = mongoose.model('Dining', diningSchema);