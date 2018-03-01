var mongoose = require('mongoose');


var departmentSchema = new mongoose.Schema({
    title:{type:String, required:true},
    department:{type:String, required:true},
    description:{type:String, required:true}
    
    
});

const Department = module.exports = mongoose.model('Department', departmentSchema);