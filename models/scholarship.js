var mongoose = require('mongoose');


var scholarshipSchema = new mongoose.Schema({
    title:{type:String, required:true},
    requirement:{type:String, required:true},
    description:{type:String, required:false},
    date:{type:String, required:true}
        
});

const Scholarship = module.exports = mongoose.model('Scholarship', scholarshipSchema);