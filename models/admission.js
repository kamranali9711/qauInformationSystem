var mongoose = require ('mongoose');

var admissionSchema = new mongoose.Schema({
    discipline       : {type:String, required:true},
    requirement : {type:String, required:true},
    lastdate    : {type:String, required:false}

});

const Admissioin = module.exports = mongoose.model('Admission', admissionSchema);