const express = require('express');
const multer = require('multer');
const uploads = multer({dest: './uploads'});
const Events = require('../models/events.js');

exports.openEvent = function(req, res){
  res.render("events");
}

exports.viewEvent = function(req, res){
  Events.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }
    else{
      res.render("viewevent",{event:result});
    }
  });
}


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads')
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname)
    }
  })



// //function used to post some data in database
// exports.add= function(req, res){
//     let newEvents = new Events({
//         title: req.body.title,
//         subtitle: req.body.subtitle,
//         description: req.body.description,
//         imageurl: req.body.imageurl,
//         date: req.body.date
//     });

//     newEvents.save((err, events)=>{
//         if(err){
//             res.json({msg: 'Failed to add the Event'});
//         }
//         else{
//             res.json({msg: 'Event is added successfully'});
//         }
//     });
// }
//  var Storage = multer.diskStorage({
//      destination: function(req, file, callback) {
//          callback(null, "uploads/");
//      },
//      filename: function(req, file, callback) {
//          callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//      }
//  });
// var upload = multer({Storage: Storage}).single('imageurl');

// exports.uploads= function(req, res) {
//      upload(req, res, function(err) {
//          if (err) {
//              return res.end("Something went wrong!");
//          }
//          return res.end("File uploaded sucessfully!.");
//      });
//  };

//function used to post some data in database
exports.add = function(req,res){
    var upload = multer({ storage: storage }).single('userFile')
    upload(req, res, function (err) {
        console.log("file Name",req.file)
        console.log("Request: ",req.body);
        console.log(req.body);
        var params = req.body;
       if(params.title==undefined ){
         res.status(404).send({
           message:'one or more perameters missing'
         });
       }else{
        new Events({
          title:params.title,
          subtitle:params.subtitle,
          description:params.description,
        imageurl:req.file.path,
          date:params.date
        }).save(function(error,result){
          if(error){
              //  res.json({msg: 'Failed to add the Events'});
            console.log(error);
      }else{
          //  res.json({msg: 'Event is added in database'});
          res.render("events",{event:result});
          // res.render("events");
            // res.render('events');
          //    console.log(result);
          }
        });
      }
    })
}






exports.delete = function(req, res, next){
    Events.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
          Events.find({}).then(function(result){
            res.render("viewevent",{event:result});
          })
            // res.json(result);
        }
    });
}



exports.edit=function(req,res){
  if(req.params.id==undefined){
    res.status(404).send({
      message:'one or more perameters missing'
    });
  }else{
    Events.findOne({_id:req.params.id}).then(function(result){
      if(!result){
        res.status(404).send({Error:"No data found"});
      }else{
        res.render("editEventForm",{event:result});
      }
    })
 }
}


exports.editEvent = function(req,res){
  console.log(req.body);
  Events.findOne({_id:req.body.id}).exec(function(err,event){
      if(err){
          res.status('500').send({message:'error'})
      }
      else{
          // console.log(notification);
          event.title=req.body.title;
          event.subtitle=req.body.subtitle;
          event.description=req.body.description;
          event.date=req.body.date;
          event.save(function(err,result){
              if(err){
                  res.status('500').send({message:'error found'})
              }
              else{
                  console.log(result);
                  res.render("viewevent",{event:result});
              }
          });
      }
  })
}

//function used to edit some data in database
// exports.editEvent=function(req,res){
//   if(req.params.id==undefined){
//     res.status(404).send({
//       message:'one or more perameters missing'
//     });
//   }else{
//     Events.findOne({_id:req.params.id}).exec(function(error,Events){
//     //  console.log(Events);
//       Events.title=req.body.title?req.body.title:Events.title;
//       Events.subtitle=req.body.subtitle?req.body.subtitle:Events.subtitle;
//       Events.description=req.body.description?req.body.description:Events.description;
//       Events.imageurl=req.body.imageurl?req.body.imageurl:Events.imageurl;
//       Events.date=req.body.date?req.body.date:Events.date;      
//       Events.save(function(error,Events){
//         if(error){
//           res.status('500').send({message:'error found'})
//         }else{
//           res.status('202').send({message:'updated'})
//         }
//       });
//     })
//  }
// }

exports.getAll = function (req, res) {
    Events
        .find({})
        .exec(function (error, events) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(events);
            }
        })
}


// exports.getAll = function(req, res, next){
//   Events
//         .find()
//         .exec()
//         .then(docs =>{
//           const response ={
//             events: docs.map(doc=>{
//               return {
//                 title: doc.title,
//                 subtitle: doc.subtitle,
//                 description: doc.description,
//                 date: doc.date,
//                 imageurl: doc.imageurl,
//               };
//             })
//           }
//         })
// }







