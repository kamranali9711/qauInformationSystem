var mongoose = require('mongoose');


var routeSchema = new mongoose.Schema({
    route:{type:String, required:true},
    detail:{type:String, required:true},
    busno:{type:String, required:false},
    time:{type:String, required:false}
        
});

const Routes = module.exports = mongoose.model('Routes', routeSchema);