const express = require ('express');
const Notification = require('../models/notifications.js');


exports.openHome=function(req,res){
    console.log("check1");
  
  res.render('notification',{notification:1234});
  }

exports.viewNotification = function(req,res){
    Notification.find({}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
            res.render('viewnotification',{notification:result});
      }
    })

  }
  


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
            res.render('notification',{notification:notifications});
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
            Notification.find({}).then(function(result){
                res.render("viewnotification",{notification:result});
            })
        }
    });
}


exports.edit=function(req,res){
    if(req.params.id==undefined){
      res.status(404).send({
        message:'one or more perameters missing'
      });
    }else{
      Notification.findOne({_id:req.params.id}).then(function(result){
        if(!result){
          res.status(404).send({Error:"No data found"});
        }else{
          res.render("editNotificationForm",{notification:result});
        }
      })
   }
  }

exports.editNotification = function(req,res){
    console.log(req.body);
    Notification.findOne({_id:req.body.id}).exec(function(err,notification){
        if(err){
            res.status('500').send({message:'error'})
        }
        else{
            console.log(notification);
            notification.title=req.body.title;
            notification.description=req.body.description;
            notification.lastdate=req.body.lastdate;
            notification.save(function(err,result){
                if(err){
                    res.status('500').send({message:'error found'})
                }
                else{
                    console.log(result);
                    res.render("viewnotification",{notification:result});
                }
            });
        }
    })
}
//   exports.editNotification = function(req,res){
//     Notification.findOne({_id:req.body.id}).exec(function(error,Notification){
//         Notification.title=req.body.title;
//         Notification.description=req.body.description;
//         Notification.lastdate=req.body.lastdate;
//       Notification.save(function(error,Notification){
//         if(error){
//           res.status('500').send({message:'error found'})
//         }else{
//           Notification.find({}).then(function(result){
//               res.render("viewnotification",{notification:result});
//           })
//         }
//       });
//     })
//   }


//   exports.editNotification = function(req,res){
//     Notification.findOne({_id:req.body.id}).exec(function(error,Notification){
//       Notification.title=req.body.title?req.body.title:Notification.title;
//       Notification.description=req.body.description?req.body.description:Notification.description;
//       Notification.lastdate=req.body.lastdate?req.body.lastdate:Notification.lastdate;
//       Notification.save(function(error,Notification){
//         if(error){
//           res.status('500').send({message:'error found'})
//         }else{
//           Notification.find({}).then(function(result){
//               res.render("viewNotification",{notification:result});
//           })
//         }
//       });
//     })
//   }



//function used to edit some data in database
// exports.edit=function(req,res){
//   if(req.params.id==undefined){
//     res.status(404).send({
//       message:'one or more perameters missing'
//     });
//   }else{
//     Notification.findOne({_id:req.params.id}).exec(function(error,Notification){
//     //  console.log(Notification);
//       Notification.title=req.body.title?req.body.title:Notification.title;
//       Notification.description=req.body.description?req.body.description:Notification.description;     
//       Notification.lastdate=req.body.lastdate?req.body.lastdate:Notification.lastdate;           
//       Notification.save(function(error,Notification){
//         if(error){
//           res.status('500').send({message:'error found'})
//         }else{
//           res.status('202').send({message:'updated'})
//         }
//       });
//     })
//  }
// }