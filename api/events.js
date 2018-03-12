const express = require('express');
const multer = require('multer');
const uploads = multer({dest: './uploads'});
const Events = require('../models/events.js');


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
          res.render("events");
          // res.render("events");
            // res.render('events');
          //    console.log(result);
          }
        });
        res.end();
      }
    })
}



// exports.add=function(req,res){

//   var params = req.body;
//     var upload = multer({ storage: storage }).single('userFile')
//     upload(req, res, function (err) {
//         console.log(req.body);
//  if(params.title==undefined ){
//    res.status(404).send({
//      message:'one or more perameters missing'
//    });
//  }else{
//   new Events({
//     title:params.title,
//     subtitle:params.subtitle,
//     description:params.description,
//     imageurl:params.imageurl,
//     date:params.date
//   }).save(function(error,result){
//     if(error){
//         //  res.json({msg: 'Failed to add the Events'});
//       console.log(error);
// }else{
//     //  res.json({msg: 'Event is added in database'});
//       res.render("events");
//     //    console.log(result);
//     }
//   });
//   res.end();
// }



//     }
//     )

// }  



  
// //function used to post some data in database
// exports.add= uploads.single('imageurl'),function(req,res){
//  var title = req.body.title;
//  var subtitle = req.body.subtitle;
//  var description = req.body.description;
//  var date = req.body.date;
 
//  if(req.file){
//    console.log('Uloading image...');
//    var imageurl = req.file.filename;
//  }else{
//    console.log('Image is not upload....');
//    var imageurl = 'noimage.jpg';
//  }

//  if(err){
//    console.log(err);
//  }else{
//    var newEvents = new Events({
//      title: title,
//      subtitle: subtitle,
//      description: description,
//      date: date,
//      imageurl: imageurl
       
//    }).save(function(error,result){
//     if(error){
//         //  res.json({msg: 'Failed to add the Events'});
//       console.log(error);
// }else{
//     //  res.json({msg: 'Event is added in database'});
//        console.log(result);
//     }
//   });
//   res.end();
//   }
 
// }


exports.delete = function(req, res, next){
    Events.remove({_id: req.params.id},function(err, result){
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
    Events.findOne({_id:req.params.id}).exec(function(error,Events){
    //  console.log(Events);
      Events.title=req.body.title?req.body.title:Events.title;
      Events.subtitle=req.body.subtitle?req.body.subtitle:Events.subtitle;
      Events.description=req.body.description?req.body.description:Events.description;
      Events.imageurl=req.body.imageurl?req.body.imageurl:Events.imageurl;
      Events.date=req.body.date?req.body.date:Events.date;      
      Events.save(function(error,Events){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}

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

