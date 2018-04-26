// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const upload = multer({dest: './uploads'});
// const News = require('../models/news.js');


const express = require('express');
const multer = require('multer');
const uploads = multer({dest: './uploads'});
const Events = require('../models/news.js');

exports.openNews = function(req, res){
    res.render("news");
}

exports.viewNews = function(req, res){
    Events.find({}).exec(function(error, result){
        if(error){
            res.status(500).send({error:error});
        }
        else{
            res.render("viewnews",{news:result});
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
        //   console.log("data is insert");
        res.render("news",{news:result});
        // res.render("news");
        // res.render('news');
            // res.render("events");
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
            // res.json(result);
            Events.find({}).then(function(result){
                res.render("viewnews",{news:result});
            })
        }
    });
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



// exports.add = upload.any(), function(req, res, next){
//     if(req.file){
//         req.file.forEach(function(file){
//             var filename = (new Date).valueOf()+"_"+file.originalname
//             fs.rename(file.path,'uploads/'+filename,function(err){
//                 if(err){
//                     throw err;
//                 }
//                 var News = new News({
//                     title: req.body.title,
//                     subtitle: req.body.subtitle,
//                     description: req.body.description,
//                     date: req.body.date,
//                     imageurl: filename                    
//                 });
//                 News.save(function(err, result){
//                     if(err){
//                         throw err;
//                     }
//                     res.json(result);
//                 });
//             });
//         });
//     }
// }

// exports.add = function(req, res){
//     console.log(req.body.title);
// }

// exports.add = upload.single('image'), function(req, res, next){
//     console.log('hello world')
// }

// exports.add = upload.single('imageurl'), function(req, res){
//     var title = req.body.title;
//     var subtitle = req.body.subtitle;
//     var description = req.body.description;
//     var date = req.body.date;

//     if(req.file){
//         console.log('file uploaded....');
//         var imageurl = req.file.filename;
//     }else{
//         console.log('file did not uploaded....');
//         var imageurl = 'noimage.jpg';
//     }

//     var newNews = News ({
//         title: title,
//         subtitle: subtitle,
//         description: description,
//         date:date

//     });
//     newNews.save(function(err, result){
//         if(err){
//             throw err;
//         }
//         res.json(result);
//     });
// }