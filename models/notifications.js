var mongoose = require ('mongoose');

var notificationSchema = new mongoose.Schema({
    title       : {type:String, required:true},
    description : {type:String, required:true},
    lastdate    : {type:String, required:false}

});

const Notification = module.exports = mongoose.model('Notification', notificationSchema);