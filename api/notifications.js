const express = require ('express');
const Notification = require('../models/notifications.js');


//function is used to post data in database
exports.add= function(req, res){
    let newNotification = new Notification({
        title: req.body.title,
        description: req.body.description,
        lastdate: req.body.lastdate
    });

    newNotification.save((err, notifications)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
            // res.json({msg: 'notifications is added successfully'});
            res.render('notification',{x:notifications});
            // res.render("notification")
        }
    });
}

// function to get data from database
exports.getAll = function(req, res){
    Notification
    .find({})
    .exec(function(error, route){
        if(error){
            res
            .status(500)
            .send({message: error});
        }
        else{
            res
            .status(200)
            .send(route);
        }
    });
}


//function form dalete data 
exports.delete = function(req, res, next){
    Notification.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
}

//function used to edit some data in database
exports.edit=function(req,res){
  if(req.params.id==undefined){
    res.status(404).send({
      message:'one or more perameters missing'
    });
  }else{
    Notification.findOne({_id:req.params.id}).exec(function(error,Notification){
    //  console.log(Notification);
      Notification.title=req.body.title?req.body.title:Notification.title;
      Notification.description=req.body.description?req.body.description:Notification.description;     
      Notification.lastdate=req.body.lastdate?req.body.lastdate:Notification.lastdate;           
      Notification.save(function(error,Notification){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}